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
let SignInContract = class SignInContract {
    validate(model) {
        const flunt = new flunt_1.Flunt();
        flunt.isRequired(model.email, 'E-mail inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');
        this.errors = flunt.errors;
        return this.errors.length === 0;
    }
};
SignInContract = __decorate([
    common_1.Injectable()
], SignInContract);
exports.SignInContract = SignInContract;
//# sourceMappingURL=sign-in.contract.js.map