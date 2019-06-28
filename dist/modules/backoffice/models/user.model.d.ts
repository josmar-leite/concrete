import { Phone } from 'src/modules/backoffice/models/phone.model';
export declare class User {
    name: string;
    email: string;
    password: string;
    phones: Phone[];
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    token: string;
    constructor(name: string, email: string, password: string, phones: Phone[], createdAt: Date, updatedAt: Date, lastLogin: Date, token: string);
}
