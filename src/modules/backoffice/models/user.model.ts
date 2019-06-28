import { Phone } from 'src/modules/backoffice/models/phone.model';

export class User {
    constructor(public name: string,
                public email: string,
                public password: string,
                public phones: Phone[],
                public createdAt: Date,
                public updatedAt: Date,
                public lastLogin: Date,
                public token: string) {

    }
  }
