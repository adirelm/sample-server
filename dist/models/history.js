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
const server_1 = __importDefault(require("./server"));
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILURE"] = "failure";
})(Status = exports.Status || (exports.Status = {}));
let History = class History extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(Status))),
    __metadata("design:type", String)
], History.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => server_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], History.prototype, "serverId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => server_1.default),
    __metadata("design:type", server_1.default)
], History.prototype, "server", void 0);
History = __decorate([
    sequelize_typescript_1.Table
], History);
exports.default = History;
//# sourceMappingURL=history.js.map