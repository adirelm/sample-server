import { Router } from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware/auth";
import { ApiError } from "../helpers/error";
import { restrictEmail } from "../utils/helpers/main";
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
 *        - admin_mail
 *      properties:
 *        name:
 *          type: string
 *          description: The server's name
 *        url:
 *          type: string
 *          description: The server's url
 *        admin_mail:
 *          type: string
 *          description: The server's admin mail
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
 *        admin_mail:
 *          type: string
 *          description: The server's admin mail
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
 *    summary: Create new server
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
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */

serverHandler.post(
  "/server",
  isAuth,
  [body("url").isURL(), body("admin_mail").isEmail()],
  async (req: any, res: any, next: any) => {
    try {
      handleValidationErrors(req);
      const name = req.body.name;
      const status = req.body.status;
      const adminMail = restrictEmail(req.body.admin_mail);
      let url = modifyUrlWithHttpOrHttps(req.body.url);

      if (await checkExistenceOfUrl(url)) {
        throw new ApiError(400, "Url already exists");
      }
      const server = await Server.create({
        name,
        url,
        status,
        admin_mail: adminMail,
      });
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
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

serverHandler.patch(
  "/server/:serverId",
  isAuth,
  [body("url").isURL(), body("admin_mail").isEmail()],
  async (req: any, res: any, next: any) => {
    try {
      const id = req.params.serverId;
      const server = await Server.findByPk(id);
      if (!server) {
        throw new ApiError(404, "Server not found");
      }

      handleValidationErrors(req);
      const name = req.body.name;
      const status = req.body.status;
      const adminMail = restrictEmail(req.body.admin_mail);
      let url = modifyUrlWithHttpOrHttps(req.body.url);

      if (await checkExistenceOfUrl(url)) {
        throw new ApiError(400, "Url already exists");
      }

      const record = await server.update({
        name,
        url,
        status,
        admin_mail: adminMail,
      });
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
 *      204:
 *        description: Server deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Server'
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Server not found
 */

serverHandler.delete("/server/:serverId", isAuth, async (req, res, next) => {
  const id = req.params.serverId;

  try {
    const server = await Server.findByPk(id);

    if (!server) {
      throw new ApiError(404, "Server not found");
    }
    await server.destroy();
    renderSuccess(res, 204, "Server deleted", server);
  } catch (error) {
    next(error);
  }
});

export default serverHandler;
