"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("../models/server"));
const history_1 = __importDefault(require("../models/history"));
const serverName = process.env.SERVER_NAME;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
exports.sequelize = new sequelize_typescript_1.Sequelize(serverName, userName, password, {
    host: host,
    dialect: "postgres",
    models: [server_1.default, history_1.default],
});
//# sourceMappingURL=database.js.map