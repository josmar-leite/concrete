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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const validator_interceptor_1 = require("src/interceptors/validator.interceptor");
const result_model_1 = require("src/modules/backoffice/models/result.model");
const create_user_contract_1 = require("src/modules/backoffice/contracts/create-user.contract");
const sign_in_contract_1 = require("src/modules/backoffice/contracts/sign-in.contract");
const create_user_dto_1 = require("src/modules/backoffice/dtos/create-user.dto");
const sign_in_dto_1 = require("src/modules/backoffice/dtos/sign-in.dto");
const user_service_1 = require("src/modules/backoffice/services/user.service");
const auth_guard_1 = require("src/shared/guards/auth.guard");
const user_model_1 = require("src/modules/backoffice/models/user.model");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne(id);
            return new result_model_1.Result(null, true, user, null);
        });
    }
    authenticate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.findOneByEmail(model.email);
            if (!user) {
                throw new common_1.HttpException(new result_model_1.Result('Usuário ou senha inválidos.', false, null, null), common_1.HttpStatus.NOT_FOUND);
            }
            let userNew = yield this.userService.authenticate(model.email, model.password);
            if (!userNew) {
                throw new common_1.HttpException(new result_model_1.Result('Usuário ou senha inválidos', false, null, null), common_1.HttpStatus.UNAUTHORIZED);
            }
            userNew = yield this.userService.findOne(userNew._id);
            return new result_model_1.Result(null, true, userNew, null);
        });
    }
    refreshToken(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.userService.createToken(request.user.name, request.user.email);
            return new result_model_1.Result(null, true, token, null);
        });
    }
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.findOneByEmail(model.email);
            if (user) {
                throw new common_1.HttpException(new result_model_1.Result('E-mail já existente.', false, null, null), common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = yield this.userService.createToken(model.name, model.email);
            user = new user_model_1.User(model.name, model.email, model.password, model.phones, new Date(), new Date(), new Date(), token.accessToken);
            let userNew = yield this.userService.create(user);
            userNew = yield this.userService.findOne(userNew._id);
            return new result_model_1.Result(null, true, userNew, null);
        });
    }
};
__decorate([
    common_1.Get('search/:id'),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Post('sign-in'),
    common_1.UseInterceptors(new validator_interceptor_1.ValidatorInterceptor(new sign_in_contract_1.SignInContract())),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "authenticate", null);
__decorate([
    common_1.Post('refresh'),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshToken", null);
__decorate([
    common_1.Post('sign-up'),
    common_1.UseInterceptors(new validator_interceptor_1.ValidatorInterceptor(new create_user_contract_1.CreateUserContract())),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map