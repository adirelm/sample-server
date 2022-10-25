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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const moment_1 = __importDefault(require("moment"));
const otplib_1 = require("otplib");
const otp_1 = __importDefault(require("./otp"));
const server_1 = __importDefault(require("./server"));
const history_1 = __importDefault(require("./history"));
const error_1 = require("../helpers/error");
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["ACTIVE"] = "active";
})(Status = exports.Status || (exports.Status = {}));
let User = class User extends sequelize_typescript_1.Model {
    async generateOtp() {
        try {
            const expiresAt = (0, moment_1.default)().add(10, "minutes").toDate();
            otplib_1.authenticator.options = {
                step: moment_1.default.duration(10, "minutes").asSeconds(),
            };
            const sharedSecret = otplib_1.authenticator.generateSecret();
            const otpCode = otplib_1.authenticator.generate(sharedSecret);
            await this.$create("otp", {
                secret: sharedSecret,
                status: Status.ACTIVE,
                expiresAt,
            });
            return otpCode;
        }
        catch (error) {
            const err = error;
            throw new error_1.ApiError(500, err.message);
        }
    }
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(Status.PENDING),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(Status))),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => server_1.default),
    __metadata("design:type", Array)
], User.prototype, "servers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => history_1.default),
    __metadata("design:type", Array)
], User.prototype, "history", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => otp_1.default),
    __metadata("design:type", Array)
], User.prototype, "otp", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.default = User;
//# sourceMappingURL=user.js.map