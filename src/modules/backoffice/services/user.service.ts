import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Md5 } from 'md5-typescript';
import 'dotenv/config';

import { User } from 'src/modules/backoffice/models/user.model';

import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly model: Model<User>,
                private readonly jwtService: JwtService) {
    }

    async createToken(name: string, email: string) {
        const jwtPayload: JwtPayload = {
            name: name,
            email: email,
        };

        const accessToken = this.jwtService.sign(jwtPayload);

        return {
            expiresIn: 1800,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.findOneByEmail(payload.email);
    }

    async authenticate(email: string, password: string): Promise<User> {
        const user = await this.model
            .findOne({'email': email})
            .exec();

        password = await Md5.init(`${password}${process.env.SALT_KEY}`);

        if (!user) {
            return null;
        }

        if (password.toString() === user.password.toString()) {
            return user;
        } else {
            return null;
        }
    }

    async create(data: User): Promise<User> {
        data.password = await Md5.init(`${data.password}${process.env.SALT_KEY}`);
        const user = new this.model(data);

        return await user.save();
    }

    async findOne(id: string): Promise<User> {
        return await this.model.findById(id, '-password').exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.model.findOne({email}, '-password').exec();
    }
}
