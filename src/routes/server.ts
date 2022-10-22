import { Router } from "express";
import { body } from "express-validator";
import { ApiError } from "../helpers/error";
import { renderSuccess } from "../utils/helpers/main";
import { handleValidationErrors } from "../helpers/error";
import { checkExistenceOfUrl } from "../utils/helpers/main";
import { modifyUrlWithHttpOrHttps } from "../utils/helpers/main";

import Server from "../models/server";

const serverHandler = Router();

/**
 * @swagger
 * components:
 *
 *  schemas:
 *    Server:
 *      type: object
 *      required:
 *        - name
 *        - url
 *      properties:
 *        name:
 *          type: string
 *          description: The server's name
 *        url:
 *          type: string
 *          description: The server's url
 *        status:
 *          type: string
 *          enum: [success, failure]
 *          description: The server's status
 *
 *    ServerRequestBody:
 *      type: object
 *      required:
 *        - name
 *        - url
 *      properties:
 *        name:
 *          type: string
 *          description: The server's name
 *        url:
 *          type: string
 *          description: The server's url
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
 * /servers:
 *  get:
 *    tags:
 *      - Server
 *    summary: Returns the list of all the servers
 *    responses:
 *      200:
 *        description: The list of the servers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Server'
 */

serverHandler.get("/servers", async (req, res, next) => {
  try {
    const servers = await Server.findAll();
    renderSuccess(res, 200, "Successfully fectched servers", servers);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /server:
 *  post:
 *    tags:
 *      - Server
 *    summary: Returns the list of all the servers
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/ServerRequestBody"
 *    responses:
 *      201:
 *        description: Server Created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Server'
 */

serverHandler.post(
  "/server",
  [body("url").isURL()],
  async (req: any, res: any, next: any) => {
    try {
      handleValidationErrors(req);
      const name = req.body.name;
      const status = req.body.status;
      let url = modifyUrlWithHttpOrHttps(req.body.url);

      if (await checkExistenceOfUrl(url)) {
        throw new ApiError(400, "Url already exists");
      }

      const server = await Server.create({ name, url, status });
      renderSuccess(res, 201, "Server created", server);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /server/{serverId}:
 *  patch:
 *    tags:
 *      - Server
 *    summary: Update server by id
 *    parameters:
 *      - $ref: "#/components/parameters/ServerIdPathParam"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/ServerRequestBody"
 *    responses:
 *      200:
 *        description: Server updated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Server'
 *      404:
 *        description: Not found
 */

serverHandler.patch(
  "/server/:serverId",
  [body("url").isURL()],
  async (req: any, res: any, next: any) => {
    try {
      const id = req.params.serverId;
      const server = await Server.findByPk(id);
      if (!server) {
        throw new ApiError(400, "Server not found");
      }

      handleValidationErrors(req);
      const name = req.body.name;
      const status = req.body.status;
      let url = modifyUrlWithHttpOrHttps(req.body.url);

      if (await checkExistenceOfUrl(url)) {
        throw new ApiError(400, "Url already exists");
      }

      const record = await server.update({ name, url, status });
      renderSuccess(res, 200, "Server updated", record);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /server/{serverId}:
 *  delete:
 *    tags:
 *      - Server
 *    summary: Delete server by id
 *    parameters:
 *      - $ref: "#/components/parameters/ServerIdPathParam"
 *
 *
 *    responses:
 *      200:
 *        description: Server deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Server'
 *      404:
 *        description: Server not found
 */

serverHandler.delete("/server/:serverId", async (req, res, next) => {
  const id = req.params.serverId;

  try {
    const server = await Server.findByPk(id);

    if (!server) {
      throw new ApiError(400, "Server not found");
    }
    await server.destroy();
    renderSuccess(res, 204, "Server deleted", server);
  } catch (error) {
    next(error);
  }
});

export default serverHandler;
