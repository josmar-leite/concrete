import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';
import { UserService } from 'src/modules/backoffice/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '84b83c0048db',
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.validateUser(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
