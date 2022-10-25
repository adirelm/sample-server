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
var Otp_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const moment_1 = __importDefault(require("moment"));
const otplib_1 = require("otplib");
const error_1 = require("../helpers/error");
const user_1 = require("./user");
const user_2 = __importDefault(require("./user"));
const ATTEMPTS_ALLOWED = 5;
var Status;
(function (Status) {
    Status["ACTIVE"] = "active";
    Status["INACTIVE"] = "inactive";
})(Status = exports.Status || (exports.Status = {}));
let Otp = Otp_1 = class Otp extends sequelize_typescript_1.Model {
    static async inactiveAllOtpOfUser(instance, options) {
        const records = await Otp_1.findAll({
            where: { userId: instance.userId },
            order: [["created_at", "DESC"]],
            offset: 1,
        });
        records.forEach(async (record) => {
            await record.update({ status: Status.INACTIVE });
        });
    }
    async validateOtp(otpCode) {
        if (this.status !== Status.ACTIVE || this.expiresAt < (0, moment_1.default)().toDate()) {
            await this.update({ status: Status.INACTIVE });
            throw new error_1.ApiError(400, "Code expired due too much attempts or due expiry");
        }
        this.attempts = this.attempts + 1;
        const isValidCode = otplib_1.authenticator.verify({
            token: otpCode,
            secret: this.secret,
        });
        if (!isValidCode) {
            if (this.attempts === ATTEMPTS_ALLOWED) {
                this.status = Status.INACTIVE;
            }
            await this.save();
            throw new error_1.ApiError(400, "Invalid code");
        }
        await this.save();
        return true;
    }
    async afterSuccessfulActivation() {
        const user = await user_2.default.findByPk(this.userId);
        if (!user) {
            throw new error_1.ApiError(400, "User not found");
        }
        await user.update({ status: user_1.Status.ACTIVE });
        await this.update({ status: Status.INACTIVE });
    }
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Otp.prototype, "secret", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Otp.prototype, "expiresAt", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Otp.prototype, "attempts", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(Status))),
    __metadata("design:type", String)
], Otp.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_2.default),
    __metadata("design:type", user_2.default)
], Otp.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => user_2.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Otp.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Otp, Object]),
    __metadata("design:returntype", Promise)
], Otp, "inactiveAllOtpOfUser", null);
Otp = Otp_1 = __decorate([
    sequelize_typescript_1.Table
], Otp);
exports.default = Otp;
//# sourceMappingURL=otp.js.map