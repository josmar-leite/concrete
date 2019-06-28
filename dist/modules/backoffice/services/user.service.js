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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const md5_typescript_1 = require("md5-typescript");
require("dotenv/config");
let UserService = class UserService {
    constructor(model, jwtService) {
        this.model = model;
        this.jwtService = jwtService;
    }
    createToken(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtPayload = {
                name: name,
                email: email,
            };
            const accessToken = this.jwtService.sign(jwtPayload);
            return {
                expiresIn: 1800,
                accessToken,
            };
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneByEmail(payload.email);
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model
                .findOne({ 'email': email })
                .exec();
            password = yield md5_typescript_1.Md5.init(`${password}${process.env.SALT_KEY}`);
            if (!user) {
                return null;
            }
            if (password.toString() === user.password.toString()) {
                return user;
            }
            else {
                return null;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.password = yield md5_typescript_1.Md5.init(`${data.password}${process.env.SALT_KEY}`);
            const user = new this.model(data);
            return yield user.save();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id, '-password').exec();
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ email }, '-password').exec();
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map