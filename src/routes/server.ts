import { Router } from "express";

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
 *        id:
 *          type: number
 *          description: The id of the server
 *        name:
 *          type: string
 *          description: The name of the server
 *        url:
 *          type: string
 *          description: The url of the server
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

    res.status(200).json({
      status: 200,
      message: "Sucessfully fetched servers",
      data: servers,
    });
  } catch (error) {
    console.log(error);
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
 *            $ref: "#/components/schemas/Server"
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

serverHandler.post("/server", async (req, res, next) => {
  const name = req.body.name;
  const url = req.body.url;

  try {
    const server = await Server.create({ name, url });

    res
      .status(201)
      .json({ status: 201, message: "Server created", data: server });
  } catch (error) {
    console.log(error);
  }
});

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
 *            $ref: "#/components/schemas/Server"
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

serverHandler.patch("/server/:serverId", async (req, res, next) => {
  const id = req.params.serverId;
  const name = req.body.name;
  const url = req.body.url;

  try {
    const server = await Server.findByPk(id);

    if (server) {
      const updatedServer = await server.update({ name, url });
      res
        .status(200)
        .json({ status: 200, message: "Server updated", data: updatedServer });
    }

    res
      .status(404)
      .json({ status: 404, message: "Server not found", data: [] });
  } catch (error) {
    console.log(error);
  }
});

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

    if (server) {
      server.destroy();
      res
        .status(200)
        .json({ status: 204, message: "Server deleted", data: server });
    }

    res
      .status(404)
      .json({ status: "404", message: "Server not found", data: [] });
  } catch (error) {
    console.log(error);
  }
});

export default serverHandler;
