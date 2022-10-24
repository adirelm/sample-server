"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const error_1 = require("../helpers/error");
const main_1 = require("../utils/helpers/main");
const main_2 = require("../utils/helpers/main");
const error_2 = require("../helpers/error");
const main_3 = require("../utils/helpers/main");
const server_1 = __importDefault(require("../models/server"));
const serverHandler = (0, express_1.Router)();
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
        const servers = await server_1.default.findAll();
        (0, main_2.renderSuccess)(res, 200, "Successfully fectched servers", servers);
    }
    catch (error) {
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
serverHandler.post("/server", auth_1.isAuth, [(0, express_validator_1.body)("url").isURL()], async (req, res, next) => {
    try {
        (0, error_2.handleValidationErrors)(req);
        const name = req.body.name;
        const status = req.body.status;
        const adminMail = (0, main_1.restrictEmail)(req.modelMail);
        let url = (0, main_3.modifyUrlWithHttpOrHttps)(req.body.url);
        const server = await server_1.default.create({
            name,
            url,
            status,
            adminMail,
            adminId: req.modelId,
        });
        (0, main_2.renderSuccess)(res, 201, "Server created", server);
    }
    catch (error) {
        next(error);
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
serverHandler.patch("/server/:serverId", auth_1.isAuth, [(0, express_validator_1.body)("url").isURL()], async (req, res, next) => {
    try {
        const id = req.params.serverId;
        const server = await server_1.default.findByPk(id);
        if (!server) {
            throw new error_1.ApiError(404, "Server not found");
        }
        (0, error_2.handleValidationErrors)(req);
        const name = req.body.name;
        const status = req.body.status;
        const adminMail = (0, main_1.restrictEmail)(req.modelMail);
        let url = (0, main_3.modifyUrlWithHttpOrHttps)(req.body.url);
        const record = await server.update({
            name,
            url,
            status,
            adminMail,
        });
        (0, main_2.renderSuccess)(res, 200, "Server updated", record);
    }
    catch (error) {
        next(error);
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
serverHandler.delete("/server/:serverId", auth_1.isAuth, async (req, res, next) => {
    const id = req.params.serverId;
    try {
        const server = await server_1.default.findByPk(id);
        if (!server) {
            throw new error_1.ApiError(404, "Server not found");
        }
        await server.destroy();
        (0, main_2.renderSuccess)(res, 204, "Server deleted", server);
    }
    catch (error) {
        next(error);
    }
});
exports.default = serverHandler;
//# sourceMappingURL=server.js.map