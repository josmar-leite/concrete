import { SignInDto } from 'src/modules/backoffice/dtos/sign-in.dto';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInContract implements Contract {
    errors: any[];

    validate(model: SignInDto): boolean {
        const flunt = new Flunt();

        flunt.isRequired(model.email, 'E-mail inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        this.errors = flunt.errors;

        return this.errors.length === 0;
    }
}
