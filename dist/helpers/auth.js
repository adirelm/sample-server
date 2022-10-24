"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServerPermissions = exports.checkUserPermissions = exports.generateTokenAndSetHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const user_1 = require("../models/user");
const user_2 = __importDefault(require("../models/user"));
const server_1 = __importDefault(require("../models/server"));
const generateTokenAndSetHeader = function (res, instance) {
    const token = jsonwebtoken_1.default.sign({ modelId: instance.id, modelMail: instance.email }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.set({ "X-Auth-Token": token });
};
exports.generateTokenAndSetHeader = generateTokenAndSetHeader;
const checkUserPermissions = async function (userId) {
    const user = await user_2.default.findByPk(userId);
    if (!user)
        throw new error_1.ApiError(401, "Unauthorized");
    if (user.status !== user_1.Status.ACTIVE) {
        throw new error_1.ApiError(400, "User on status pending, request denied");
    }
    return user;
};
exports.checkUserPermissions = checkUserPermissions;
const checkServerPermissions = async function (serverId, userId) {
    const server = await server_1.default.findByPk(serverId);
    if (!server) {
        throw new error_1.ApiError(404, "Server not found");
    }
    if (server.id !== userId) {
        throw new error_1.ApiError(400, "Request denied, you are not the admin");
    }
    return server;
};
exports.checkServerPermissions = checkServerPermissions;
//# sourceMappingURL=auth.js.map