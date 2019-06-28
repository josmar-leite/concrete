import { CreateUserDto } from 'src/modules/backoffice/dtos/create-user.dto';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserContract implements Contract {
    errors: any[];

    validate(model: CreateUserDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isRequired(model.password, 'Senha inválida');

        this.errors = flunt.errors;

        return this.errors.length === 0;
    }
}
