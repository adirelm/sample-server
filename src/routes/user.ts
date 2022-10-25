import bcrypt from "bcrypt";
import { Router } from "express";
import { body } from "express-validator";
import { Status as OtpStatus } from "../models/otp";
import { Status as UserStatus } from "../models/user";
import { generateTokenAndSetHeader } from "../helpers/auth";
import { ApiError, handleValidationErrors } from "../helpers/error";
import { restrictEmail, renderSuccess } from "../utils/helpers/main";
import { sendMailUserWelcome, sendMailUserActivated } from "../helpers/email";

import User from "../models/user";
import Otp from "../models/otp";

const userRouter = Router();

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

userRouter.post(
  "/signup",
  [
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req: any, res: any, next: any) => {
    try {
      const username = req.body.username;
      const password = await bcrypt.hash(req.body.password, 12);
      const email = restrictEmail(req.body.email);
      const firstName = req.body.first_name;
      const lastName = req.body.last_name;

      handleValidationErrors(req);

      const isEmailExist = await User.findOne({ where: { email } });
      if (!!isEmailExist) throw new ApiError(400, "Email already exists");
      const isUserNameExist = await User.findOne({ where: { username } });
      if (!!isUserNameExist) throw new ApiError(400, "Username alreadt exists");

      const user = await User.create({
        username,
        password,
        email,
        firstName,
        lastName,
      });

      const otpCode = await user.generateOtp();
      sendMailUserWelcome(username, firstName, otpCode, email);
      generateTokenAndSetHeader(res, user);

      renderSuccess(res, 201, "User created", {
        username,
        email,
        status: user.status,
        firstName,
        lastName,
      });
    } catch (error) {
      next(error);
    }
  }
);

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

userRouter.post(
  "/login",
  [body("email").isEmail()],
  async (req: any, res: any, next: any) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw new ApiError(400, "User not found");

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new ApiError(400, "Wrong password");

      generateTokenAndSetHeader(res, user);

      renderSuccess(res, 200, "Sucessfully logged in", {
        username: user.username,
        email: user.email,
        status: user.status,
        first_name: user.firstName,
        last_name: user.lastName,
      });
    } catch (error) {
      next(error);
    }
  }
);

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

userRouter.post("/validate_code", async (req: any, res: any, next: any) => {
  const email = req.body.email;
  const code = req.body.code;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const otp = await user.$get("otp", {
      where: { status: OtpStatus.ACTIVE },
      order: [["created_at", "DESC"]],
      limit: 1,
    });

    const isValid = await otp[0]?.validateOtp(code);
    if (!isValid) {
      throw new ApiError(400, "No otp available");
    }
    otp[0].afterSuccessfulActivation();
    generateTokenAndSetHeader(res, user);
    sendMailUserActivated(user.username, user.email);
    renderSuccess(res, 200, "User activated", []);
  } catch (error) {
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

userRouter.post("/resend_code", async (req: any, res: any, next: any) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(400, "User not found");
    if (user.status === UserStatus.ACTIVE) {
      throw new ApiError(400, "User already activated");
    }
    const otpCode = await user.generateOtp();
    sendMailUserWelcome(user.username, user.firstName, otpCode, email);

    renderSuccess(res, 200, "Code resent", []);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
