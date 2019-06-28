"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const result_model_1 = require("src/modules/backoffice/models/result.model");
const common_1 = require("@nestjs/common");
let ValidatorInterceptor = class ValidatorInterceptor {
    constructor(contract) {
        this.contract = contract;
    }
    intercept(context, call$) {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);
        if (!valid) {
            throw new common_1.HttpException(new result_model_1.Result('Ops, algo saiu errado', false, null, this.contract.errors), common_1.HttpStatus.BAD_REQUEST);
        }
        return call$;
    }
};
ValidatorInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], ValidatorInterceptor);
exports.ValidatorInterceptor = ValidatorInterceptor;
//# sourceMappingURL=validator.interceptor.js.map