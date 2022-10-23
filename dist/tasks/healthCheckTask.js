"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckTask = void 0;
const history_1 = require("../models/history");
const email_1 = require("../helpers/email");
const server_1 = __importDefault(require("../models/server"));
const CONDITION_TO_SUCCESS = 5;
const CONDITION_TO_FAILURE = 3;
const healthCheckTask = async function () {
    try {
        const servers = await server_1.default.findAll();
        servers.forEach(async (server) => {
            const history = await server.$get("histroy", {
                order: [["createdAt", "DESC"]],
                limit: 5,
            });
            let successCounter = 0;
            let failureCounter = 0;
            history.forEach((record) => {
                record.status === history_1.Status.SUCCESS
                    ? successCounter++
                    : failureCounter++;
            });
            if (successCounter === CONDITION_TO_SUCCESS &&
                server.status !== history_1.Status.SUCCESS) {
                await server.update({ status: history_1.Status.SUCCESS });
                await (0, email_1.sendMailToAdminStatusChanged)(server.name, server.url, server.status, server.admin_mail);
            }
            else if (failureCounter === CONDITION_TO_FAILURE &&
                server.status !== history_1.Status.FAILURE) {
                await server.update({ status: history_1.Status.FAILURE });
                await (0, email_1.sendMailToAdminStatusChanged)(server.name, server.url, server.status, server.admin_mail);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.healthCheckTask = healthCheckTask;
//# sourceMappingURL=healthCheckTask.js.map