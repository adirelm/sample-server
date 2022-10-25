"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const otp_1 = require("../models/otp");
const user_1 = require("../models/user");
const auth_1 = require("../helpers/auth");
const error_1 = require("../helpers/error");
const main_1 = require("../utils/helpers/main");
const email_1 = require("../helpers/email");
const user_2 = __importDefault(require("../models/user"));
const userRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - email
 *      properties:
 *        username:
 *          type: string
 *          description: The user's username
 *        password:
 *          type: string
 *          description: The user's password
 *        email:
 *          type: string
 *          description: The user's email
 *        first_name:
 *          type: string
 *          description: The user's first name
 *        last_name:
 *          type: string
 *          description: The user's last name
 *        status:
 *          type: string
 *          enum: [active, pending]
 *          description: The user's status
 *
 *  parameters:
 *    UserIdPathParam:
 *      name: userId
 *      in: path
 *      description: User id
 *      required: true
 *      schema:
 *        type: number
 */
/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - User
 *    summary: Signup as new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                description: The user's username
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *              first_name:
 *                type: string
 *                description: The user's first name
 *              last_name:
 *                type: string
 *                description: The user's last name
 *
 *    responses:
 *      201:
 *        description: Sucessfully created user
 *        headers:
 *           X-Auth-Token:
 *            schema:
 *              type: string
 *            description: A valid user API access token
 *      400:
 *        description: Bad request
 */
userRouter.post("/signup", [
    (0, express_validator_1.body)("username").isLength({ min: 5 }),
    (0, express_validator_1.body)("password").isLength({ min: 5 }),
    (0, express_validator_1.body)("email").isEmail(),
], async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = await bcrypt_1.default.hash(req.body.password, 12);
        const email = (0, main_1.restrictEmail)(req.body.email);
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        (0, error_1.handleValidationErrors)(req);
        const isEmailExist = await user_2.default.findOne({ where: { email } });
        if (!!isEmailExist)
            throw new error_1.ApiError(400, "Email already exists");
        const isUserNameExist = await user_2.default.findOne({ where: { username } });
        if (!!isUserNameExist)
            throw new error_1.ApiError(400, "Username alreadt exists");
        const user = await user_2.default.create({
            username,
            password,
            email,
            firstName,
            lastName,
        });
        const otpCode = await user.generateOtp();
        (0, email_1.sendMailUserWelcome)(username, firstName, otpCode, email);
        (0, auth_1.generateTokenAndSetHeader)(res, user);
        (0, main_1.renderSuccess)(res, 201, "User created", {
            username,
            email,
            status: user.status,
            firstName,
            lastName,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - User
 *    summary: Login as a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      201:
 *        description: Sucessfully logged in
 *        headers:
 *           X-Auth-Token:
 *            schema:
 *              type: string
 *            description: A valid user API access token
 *      400:
 *        description: Bad request
 */
userRouter.post("/login", [(0, express_validator_1.body)("email").isEmail()], async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await user_2.default.findOne({
            where: { email },
        });
        if (!user)
            throw new error_1.ApiError(400, "User not found");
        const isEqual = await bcrypt_1.default.compare(password, user.password);
        if (!isEqual)
            throw new error_1.ApiError(400, "Wrong password");
        (0, auth_1.generateTokenAndSetHeader)(res, user);
        (0, main_1.renderSuccess)(res, 200, "Sucessfully logged in", {
            username: user.username,
            email: user.email,
            status: user.status,
            first_name: user.firstName,
            last_name: user.lastName,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /validate_code:
 *  post:
 *    tags:
 *      - User
 *    summary: Activate user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - code
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              code:
 *                type: string
 *                description: One time password that sent via mail to the user
 *    responses:
 *      200:
 *        description: User activated
 *        headers:
 *           X-Auth-Token:
 *            schema:
 *              type: string
 *            description: A valid user API access token
 *      400:
 *        description: Bad request
 */
userRouter.post("/validate_code", async (req, res, next) => {
    var _a;
    const email = req.body.email;
    const code = req.body.code;
    try {
        const user = await user_2.default.findOne({ where: { email } });
        if (!user) {
            throw new error_1.ApiError(400, "User not found");
        }
        const otp = await user.$get("otp", {
            where: { status: otp_1.Status.ACTIVE },
            order: [["created_at", "DESC"]],
            limit: 1,
        });
        const isValid = await ((_a = otp[0]) === null || _a === void 0 ? void 0 : _a.validateOtp(code));
        if (!isValid) {
            throw new error_1.ApiError(400, "No otp available");
        }
        otp[0].afterSuccessfulActivation();
        (0, auth_1.generateTokenAndSetHeader)(res, user);
        (0, email_1.sendMailUserActivated)(user.username, user.email);
        (0, main_1.renderSuccess)(res, 200, "User activated", []);
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /resend_code:
 *  post:
 *    tags:
 *      - User
 *    summary: Resend otp code
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *    responses:
 *      200:
 *        description: Code resent
 *      400:
 *        description: Bad request
 */
userRouter.post("/resend_code", async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await user_2.default.findOne({ where: { email } });
        if (!user)
            throw new error_1.ApiError(400, "User not found");
        if (user.status === user_1.Status.ACTIVE) {
            throw new error_1.ApiError(400, "User already activated");
        }
        const otpCode = await user.generateOtp();
        (0, email_1.sendMailUserWelcome)(user.username, user.firstName, otpCode, email);
        (0, main_1.renderSuccess)(res, 200, "Code resent", []);
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map