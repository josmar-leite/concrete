import { Controller, Get, Param, Post, Body, UseInterceptors, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Result } from 'src/modules/backoffice/models/result.model';
import { CreateUserContract } from 'src/modules/backoffice/contracts/create-user.contract';
import { SignInContract } from 'src/modules/backoffice/contracts/sign-in.contract';
import { CreateUserDto } from 'src/modules/backoffice/dtos/create-user.dto';
import { SignInDto } from 'src/modules/backoffice/dtos/sign-in.dto';
import { UserService } from 'src/modules/backoffice/services/user.service';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/modules/backoffice/models/user.model';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('search/:id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(id);

        return new Result(null, true, user, null);
    }

    @Post('sign-in')
    @UseInterceptors(new ValidatorInterceptor(new SignInContract()))
    async authenticate(@Body() model: SignInDto): Promise<any> {
        let user = await this.userService.findOneByEmail(model.email);

        if (!user) {
            throw new HttpException(new Result('Usuário ou senha inválidos.', false, null, null), HttpStatus.NOT_FOUND);
        }

        let userNew: any = await this.userService.authenticate(model.email, model.password);

        if (!userNew) {
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        userNew = await this.userService.findOne(userNew._id);

        return new Result(null, true, userNew, null);
    }

    @Post('sign-up')
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async create(@Body() model: CreateUserDto) {
        let user = await this.userService.findOneByEmail(model.email);

        if (user) {
            throw new HttpException(new Result('E-mail já existente.', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        const token = await this.userService.createToken(model.name, model.email);
        user = new User(model.name, model.email, model.password, model.phones, new Date(), new Date(), new Date(), token.accessToken);

        let userNew: any = await this.userService.create(user);

        userNew = await this.userService.findOne(userNew._id);

        return new Result(null, true, userNew, null);
    }
}
