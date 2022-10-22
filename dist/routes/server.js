"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
serverHandler.get("/servers", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield server_1.default.findAll();
        res.status(200).json({
            status: 200,
            message: "Sucessfully fetched servers",
            data: servers,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
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
serverHandler.post("/server", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const url = req.body.url;
    const status = req.body.status;
    try {
        const server = yield server_1.default.create({ name, url, status });
        res
            .status(201)
            .json({ status: 201, message: "Server created", data: server });
    }
    catch (error) {
        console.log(error);
    }
}));
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
serverHandler.patch("/server/:serverId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.serverId;
    const name = req.body.name;
    const url = req.body.url;
    const status = req.body.status;
    try {
        const server = yield server_1.default.findByPk(id);
        if (server) {
            const updatedServer = yield server.update({ name, url, status });
            res
                .status(200)
                .json({ status: 200, message: "Server updated", data: updatedServer });
        }
        res
            .status(404)
            .json({ status: 404, message: "Server not found", data: [] });
    }
    catch (error) {
        console.log(error);
    }
}));
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
serverHandler.delete("/server/:serverId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.serverId;
    try {
        const server = yield server_1.default.findByPk(id);
        if (server) {
            server.destroy();
            res
                .status(200)
                .json({ status: 204, message: "Server deleted", data: server });
        }
        res
            .status(404)
            .json({ status: "404", message: "Server not found", data: [] });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = serverHandler;
//# sourceMappingURL=server.js.map