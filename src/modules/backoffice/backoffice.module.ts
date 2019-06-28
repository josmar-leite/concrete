import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

import { UserService } from 'src/modules/backoffice/services/user.service';
import { UserController } from 'src/modules/backoffice/controllers/user.controller';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: '84b83c0048db',
            signOptions: {
                expiresIn: 1800,
            },
        }),
        MongooseModule.forFeature([
        {
            name: 'User',
            schema: UserSchema,
        },
    ])],
    controllers: [
        UserController,
    ],
    providers: [
        JwtStrategy,
        UserService,
    ],
})
export class BackofficeModule {}
