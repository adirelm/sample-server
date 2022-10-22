"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("../models/server"));
const history_1 = __importDefault(require("../models/history"));
const serverName = process.env.SERVER_NAME;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
let sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new sequelize_typescript_1.Sequelize("postgres://zmtpbrnahytmdy:1cdbc716d6574fc611b99b4bcf1daae38b32d0ada6c57b8b4cdd85663f6f5824@ec2-23-20-140-229.compute-1.amazonaws.com:5432/d2vtb9480939rt", {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        models: [server_1.default, history_1.default],
    });
}
else {
    sequelize = new sequelize_typescript_1.Sequelize(serverName, userName, password, {
        host: host,
        dialect: "postgres",
        models: [server_1.default, history_1.default],
    });
}
exports.default = sequelize;
//# sourceMappingURL=database.js.map