"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../helpers/error");
const isAuth = async (req, res, next) => {
    try {
        const token = req.header("X-Auth-Token");
        if (!token)
            throw new error_1.ApiError(401, "Unauthorized");
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
        if (!decodedToken)
            throw new error_1.ApiError(401, "Unauthorized");
        if (!decodedToken.modelId || !decodedToken.modelMail)
            throw new error_1.ApiError(400, "Can't fetch user mail or user id from token");
        req.modelId = decodedToken.modelId;
        req.modelMail = decodedToken.modelMail;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map