import { Router } from "express";
import { body } from "express-validator";
import { ApiError } from "../helpers/error";
import { isAuth } from "../middleware/auth";
import { renderSuccess } from "../utils/helpers/main";

import Server from "../models/server";
import History from "../models/history";
import { checkServerPermissions, checkUserPermissions } from "../helpers/auth";

const historyHandler = Router();

/**
 * @swagger
 * components:
 *
 *  schemas:
 *    History:
 *      type: object
 *      required:
 *        - status
 *        - server_id
 *      properties:
 *        status:
 *          type: string
 *          enum: [success, failure]
 *          description: The server's sample record status
 *        server_id:
 *          type: number
 *          description: The server's associated id
 *
 *
 *  parameters:
 *    ServerIdPathParam:
 *      name: serverId
 *      in: path
 *      description: Server id
 *      required: true
 *      schema:
 *        type: number
 *
 */

/**
 * @swagger
 * /history/{serverId}:
 *  get:
 *    tags:
 *      - History
 *    summary: Returns list of all the history records of specific server
 *    parameters:
 *      - $ref: "#/components/parameters/ServerIdPathParam"
 *    responses:
 *      200:
 *        description: The list of the associated server's history record
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/History'
 *      400:
 *        description: Not found
 */

historyHandler.get(
  "/history/:serverId",
  isAuth,
  async (req: any, res: any, next: any) => {
    const id = req.params.serverId;
    try {
      const user = await checkUserPermissions(req.modelId);
      const server = await checkServerPermissions(id, user.id);
      const serverHistory = await server.$get("histroy");
      renderSuccess(res, 200, "Successfully fetched history", serverHistory);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /history:
 *  get:
 *    tags:
 *      - History
 *    summary: Returns list of all the history records of all the servers that associated with the authorized user
 *    responses:
 *      200:
 *        description: Sucessfully fetched user servers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/History'
 *      400:
 *        description: Not found
 */

historyHandler.get(
  "/history",
  isAuth,
  async (req: any, res: any, next: any) => {
    try {
      const user = await checkUserPermissions(req.modelId);
      const history = await user.$get("history");
      renderSuccess(res, 200, "Successfully fetched history", history);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /history:
 *  delete:
 *    tags:
 *      - History
 *    summary: Delete history of all samples which belong to the authenticated user
 *    responses:
 *      204:
 *        description: History cleaned
 *      400:
 *        description: Not found
 */

historyHandler.delete(
  "/history",
  isAuth,
  async (req: any, res: any, next: any) => {
    try {
      const user = await checkUserPermissions(req.modelId);
      await History.destroy({ where: { userId: user.id }, truncate: true });
      renderSuccess(res, 204, "History cleaned", []);
    } catch (error) {
      next(error);
    }
  }
);

export default historyHandler;
