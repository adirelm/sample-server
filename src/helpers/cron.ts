import cron from "node-cron";
import { healthCheckTask } from "../tasks/healthCheckTask";
import { sampleServerTask } from "../tasks/sampleServerTask";
import { deleteAllHistoryTask } from "../tasks/deleteAllHistoryTask";

const schedulingTasksTwoMinutes = cron.schedule(
  "*/2 * * * * *",
  async () => {
    await sampleServerTask();
    await healthCheckTask();
  },
  { scheduled: false }
);

const schedulingTasksHalfHour = cron.schedule(
  "*/30 * * * *",
  async () => {
    await deleteAllHistoryTask();
  },
  { scheduled: false }
);

export const startScheduledTasks = function () {
  schedulingTasksTwoMinutes.start();
  schedulingTasksHalfHour.start();
};
