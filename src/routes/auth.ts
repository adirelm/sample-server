import jwt from "jsonwebtoken";
import { Router } from "express";
import { renderSuccess } from "../utils/helpers/main";

const authRouter = Router();

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
  const token = jwt.sign({}, "secret", { expiresIn: "1h" });
  res.set({ "X-Auth-Token": token });
  renderSuccess(res, 201, "Token created", []);
});

export default authRouter;
