"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulingTasks = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const healthCheckTask_1 = require("../tasks/healthCheckTask");
const sampleServerTask_1 = require("../tasks/sampleServerTask");
exports.schedulingTasks = node_cron_1.default.schedule("* * * * *", async () => {
    await (0, sampleServerTask_1.sampleServerTask)();
    await (0, healthCheckTask_1.healthCheckTask)();
}, { scheduled: false });
//# sourceMappingURL=cron.js.map