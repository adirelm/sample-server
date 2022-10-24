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
const sequelize_typescript_1 = require("sequelize-typescript");
const history_1 = require("./history");
const email_1 = require("../helpers/email");
const email_2 = require("../helpers/email");
const history_2 = __importDefault(require("./history"));
let Server = class Server extends sequelize_typescript_1.Model {
    static async sendStatusMail(instance, options) {
        if (instance.changed("status")) {
            await (0, email_2.sendMailToAdminStatusChanged)(instance.name, instance.url, instance.status, instance.admin_mail);
        }
    }
    static async sendWelcomeMail(instance, options) {
        await (0, email_1.sendMailToAdminWelcome)(instance.name, instance.url, instance.admin_mail);
    }
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Server.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Server.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(history_1.Status))),
    __metadata("design:type", String)
], Server.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Server.prototype, "admin_mail", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => history_2.default),
    __metadata("design:type", Array)
], Server.prototype, "histroy", void 0);
__decorate([
    sequelize_typescript_1.AfterSave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Server, Object]),
    __metadata("design:returntype", Promise)
], Server, "sendStatusMail", null);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Server, Object]),
    __metadata("design:returntype", Promise)
], Server, "sendWelcomeMail", null);
Server = __decorate([
    sequelize_typescript_1.Table
], Server);
exports.default = Server;
//# sourceMappingURL=server.js.map