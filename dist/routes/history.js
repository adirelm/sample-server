"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const main_1 = require("../utils/helpers/main");
const history_1 = __importDefault(require("../models/history"));
const auth_2 = require("../helpers/auth");
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
historyHandler.get("/history/:serverId", auth_1.isAuth, async (req, res, next) => {
    const id = req.params.serverId;
    try {
        const user = await (0, auth_2.checkUserPermissions)(req.modelId);
        const server = await (0, auth_2.checkServerPermissions)(id, user.id);
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
historyHandler.get("/history", auth_1.isAuth, async (req, res, next) => {
    try {
        const user = await (0, auth_2.checkUserPermissions)(req.modelId);
        const history = await user.$get("history");
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
 *    summary: Delete history of all samples which belong to the authenticated user
 *    responses:
 *      204:
 *        description: History cleaned
 *      400:
 *        description: Not found
 */
historyHandler.delete("/history", auth_1.isAuth, async (req, res, next) => {
    try {
        const user = await (0, auth_2.checkUserPermissions)(req.modelId);
        await history_1.default.destroy({ where: { userId: user.id }, truncate: true });
        (0, main_1.renderSuccess)(res, 204, "History cleaned", []);
    }
    catch (error) {
        next(error);
    }
});
exports.default = historyHandler;
//# sourceMappingURL=history.js.map