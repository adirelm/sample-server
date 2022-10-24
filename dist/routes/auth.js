"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const main_1 = require("../utils/helpers/main");
const authRouter = (0, express_1.Router)();
/**
 * @swagger
 * /token:
 *  get:
 *    tags:
 *      - Auth
 *    summary: Get token
 *    responses:
 *      201:
 *        description: Sucessfully created token
 *        headers:
 *           X-Auth-Token:
 *            schema:
 *              type: string
 *            description: A valid user API access token
 */
authRouter.get("/token", async (req, res, next) => {
    const token = jsonwebtoken_1.default.sign({}, "secret", { expiresIn: "1h" });
    res.set({ "X-Auth-Token": token });
    (0, main_1.renderSuccess)(res, 201, "Token created", []);
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map