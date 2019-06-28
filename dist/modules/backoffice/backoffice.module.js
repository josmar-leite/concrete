"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
require("dotenv/config");
const user_service_1 = require("src/modules/backoffice/services/user.service");
const user_controller_1 = require("src/modules/backoffice/controllers/user.controller");
const jwt_strategy_1 = require("src/shared/strategies/jwt.strategy");
const user_schema_1 = require("src/modules/backoffice/schemas/user.schema");
let BackofficeModule = class BackofficeModule {
};
BackofficeModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            jwt_1.JwtModule.register({
                secret: '84b83c0048db',
                signOptions: {
                    expiresIn: 1800,
                },
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: user_schema_1.UserSchema,
                },
            ])
        ],
        controllers: [
            user_controller_1.UserController,
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
        ],
    })
], BackofficeModule);
exports.BackofficeModule = BackofficeModule;
//# sourceMappingURL=backoffice.module.js.map