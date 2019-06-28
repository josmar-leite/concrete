"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flunt_1 = require("src/utils/flunt");
const common_1 = require("@nestjs/common");
let CreateUserContract = class CreateUserContract {
    validate(model) {
        const flunt = new flunt_1.Flunt();
        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isRequired(model.password, 'Senha inválida');
        this.errors = flunt.errors;
        return this.errors.length === 0;
    }
};
CreateUserContract = __decorate([
    common_1.Injectable()
], CreateUserContract);
exports.CreateUserContract = CreateUserContract;
//# sourceMappingURL=create-user.contract.js.map