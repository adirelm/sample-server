"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleServerTask = void 0;
const axios_1 = __importDefault(require("axios"));
const performance_now_1 = __importDefault(require("performance-now"));
const history_1 = require("../models/history");
const server_1 = __importDefault(require("../models/server"));
const history_2 = __importDefault(require("../models/history"));
const TIME_FOR_FAILURE = 60;
const sampleServerTask = async function () {
    const servers = await server_1.default.findAll();
    servers.forEach(async (server) => {
        const url = server.url;
        const startTime = (0, performance_now_1.default)();
        try {
            const response = await axios_1.default.get(url, { validateStatus: () => true });
            const endTime = (0, performance_now_1.default)();
            const responseTime = (endTime - startTime) / 1000;
            if (response.statusText === "OK" && responseTime < TIME_FOR_FAILURE) {
                await server.$create("histroy", { status: history_1.Status.SUCCESS });
            }
            else {
                await server.$create("history", { status: history_1.Status.FAILURE });
            }
        }
        catch (error) {
            await history_2.default.create({
                status: history_1.Status.FAILURE,
                serverId: server.id,
            });
        }
    });
};
exports.sampleServerTask = sampleServerTask;
//# sourceMappingURL=sampleServerTask.js.map