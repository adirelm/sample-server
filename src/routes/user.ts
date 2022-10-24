import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { body } from "express-validator";
import { renderSuccess } from "../utils/helpers/main";
import { generateTokenAndSetHeader } from "../helpers/auth";
import { ApiError, handleValidationErrors } from "../helpers/error";

import { Status as UserStatus } from "../models/user";

import User from "../models/user";

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
      const email = req.body.email;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const status = UserStatus.PENDING;

      handleValidationErrors(req);

      const user = await User.create({
        username,
        password,
        email,
        status,
        firstName,
        lastName,
      });

      generateTokenAndSetHeader(res, user);
      renderSuccess(res, 201, "User created", {
        username,
        email,
        status,
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

export default userRouter;
