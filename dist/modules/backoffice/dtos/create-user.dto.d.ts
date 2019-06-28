import { Phone } from 'src/modules/backoffice/models/phone.model';
export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly phones: Phone[];
}
