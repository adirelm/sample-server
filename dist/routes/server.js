"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const error_1 = require("../helpers/error");
const main_1 = require("../utils/helpers/main");
const main_2 = require("../utils/helpers/main");
const email_1 = require("../helpers/email");
const error_2 = require("../helpers/error");
const main_3 = require("../utils/helpers/main");
const main_4 = require("../utils/helpers/main");
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
serverHandler.post("/server", [(0, express_validator_1.body)("url").isURL(), (0, express_validator_1.body)("admin_mail").isEmail()], async (req, res, next) => {
    try {
        (0, error_2.handleValidationErrors)(req);
        const name = req.body.name;
        const status = req.body.status;
        const adminMail = (0, main_1.restrictEmail)(req.body.admin_mail);
        let url = (0, main_4.modifyUrlWithHttpOrHttps)(req.body.url);
        if (await (0, main_3.checkExistenceOfUrl)(url)) {
            throw new error_1.ApiError(400, "Url already exists");
        }
        await (0, email_1.sendMailToAdminWelcome)(name, url, adminMail);
        const server = await server_1.default.create({
            name,
            url,
            status,
            admin_mail: adminMail,
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
 *      404:
 *        description: Not found
 */
serverHandler.patch("/server/:serverId", [(0, express_validator_1.body)("url").isURL(), (0, express_validator_1.body)("admin_mail").isEmail()], async (req, res, next) => {
    try {
        const id = req.params.serverId;
        const server = await server_1.default.findByPk(id);
        if (!server) {
            throw new error_1.ApiError(400, "Server not found");
        }
        (0, error_2.handleValidationErrors)(req);
        const name = req.body.name;
        const status = req.body.status;
        const adminMail = (0, main_1.restrictEmail)(req.body.admin_mail);
        let url = (0, main_4.modifyUrlWithHttpOrHttps)(req.body.url);
        if (await (0, main_3.checkExistenceOfUrl)(url)) {
            throw new error_1.ApiError(400, "Url already exists");
        }
        const record = await server.update({
            name,
            url,
            status,
            admin_mail: adminMail,
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
        const server = await server_1.default.findByPk(id);
        if (!server) {
            throw new error_1.ApiError(400, "Server not found");
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