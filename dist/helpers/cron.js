"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduledTasks = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const healthCheckTask_1 = require("../tasks/healthCheckTask");
const sampleServerTask_1 = require("../tasks/sampleServerTask");
const deleteAllHistoryTask_1 = require("../tasks/deleteAllHistoryTask");
const schedulingTasksTwoMinutes = node_cron_1.default.schedule("*/2 * * * *", async () => {
    await (0, sampleServerTask_1.sampleServerTask)();
    await (0, healthCheckTask_1.healthCheckTask)();
}, { scheduled: false });
const schedulingTasksHalfHour = node_cron_1.default.schedule("*/30 * * * *", async () => {
    await (0, deleteAllHistoryTask_1.deleteAllHistoryTask)();
}, { scheduled: false });
const startScheduledTasks = function () {
    schedulingTasksTwoMinutes.start();
    schedulingTasksHalfHour.start();
};
exports.startScheduledTasks = startScheduledTasks;
//# sourceMappingURL=cron.js.map