import { Result } from 'src/modules/backoffice/models/result.model';
import { CreateUserDto } from 'src/modules/backoffice/dtos/create-user.dto';
import { SignInDto } from 'src/modules/backoffice/dtos/sign-in.dto';
import { UserService } from 'src/modules/backoffice/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string): Promise<Result>;
    authenticate(model: SignInDto): Promise<any>;
    refreshToken(request: any): Promise<any>;
    create(model: CreateUserDto): Promise<Result>;
}
