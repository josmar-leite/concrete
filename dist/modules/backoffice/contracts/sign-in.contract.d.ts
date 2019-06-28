import { SignInDto } from 'src/modules/backoffice/dtos/sign-in.dto';
import { Contract } from 'src/modules/backoffice/contracts/contract';
export declare class SignInContract implements Contract {
    errors: any[];
    validate(model: SignInDto): boolean;
}
