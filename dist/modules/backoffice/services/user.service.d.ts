import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { User } from 'src/modules/backoffice/models/user.model';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
export declare class UserService {
    private readonly model;
    private readonly jwtService;
    constructor(model: Model<User>, jwtService: JwtService);
    createToken(name: string, email: string): Promise<{
        expiresIn: number;
        accessToken: string;
    }>;
    validateUser(payload: JwtPayload): Promise<any>;
    authenticate(email: string, password: string): Promise<User>;
    create(data: User): Promise<User>;
    findOne(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
