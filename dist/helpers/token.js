"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetHeader = function (res, instance) {
    const token = jsonwebtoken_1.default.sign({ modelId: instance.id, modelMail: instance.email }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.set({ "X-Auth-Token": token });
};
exports.generateTokenAndSetHeader = generateTokenAndSetHeader;
//# sourceMappingURL=token.js.map