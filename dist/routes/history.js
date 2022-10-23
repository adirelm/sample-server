"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../helpers/error");
const main_1 = require("../utils/helpers/main");
const server_1 = __importDefault(require("../models/server"));
const history_1 = __importDefault(require("../models/history"));
const historyHandler = (0, express_1.Router)();
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
        const server = await server_1.default.findByPk(id);
        if (!server) {
            throw new error_1.ApiError(404, "Server not found");
        }
        const serverHistory = await server.$get("histroy");
        (0, main_1.renderSuccess)(res, 200, "Successfully fetched history", serverHistory);
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /history:
 *  get:
 *    tags:
 *      - History
 *    summary: Returns list of all the history records of all servers
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
historyHandler.get("/history", async (req, res, next) => {
    try {
        const history = await history_1.default.findAll();
        (0, main_1.renderSuccess)(res, 200, "Successfully fetched history", history);
    }
    catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /history:
 *  delete:
 *    tags:
 *      - History
 *    summary: Delete history of all samples
 *    responses:
 *      204:
 *        description: History cleaned
 *      400:
 *        descriptipn: Not found
 */
historyHandler.delete("/history", async (req, res, next) => {
    try {
        await history_1.default.destroy({ truncate: true });
        (0, main_1.renderSuccess)(res, 204, "History cleaned", []);
    }
    catch (error) {
        next(error);
    }
});
exports.default = historyHandler;
//# sourceMappingURL=history.js.map