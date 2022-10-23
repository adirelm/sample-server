import { Router } from "express";
import { body } from "express-validator";
import { ApiError } from "../helpers/error";
import { renderSuccess } from "../utils/helpers/main";

import Server from "../models/server";

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
 *        descriptipn: Not found
 */

historyHandler.get("/history/:serverId", async (req, res, next) => {
  const id = req.params.serverId;
  try {
    const server = await Server.findByPk(id);
    if (!server) {
      throw new ApiError(404, "Server not found");
    }
    const serverHistory = await server.$get("histroy");
    renderSuccess(res, 200, "Successfully fetched history", serverHistory);
  } catch (error) {
    next(error);
  }
});

export default historyHandler;
