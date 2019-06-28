import { CreateUserDto } from 'src/modules/backoffice/dtos/create-user.dto';
import { Contract } from 'src/modules/backoffice/contracts/contract';
export declare class CreateUserContract implements Contract {
    errors: any[];
    validate(model: CreateUserDto): boolean;
}
