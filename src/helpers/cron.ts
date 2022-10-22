import cron from "node-cron";
import { healthCheckTask } from "../tasks/healthCheckTask";
import { sampleServerTask } from "../tasks/sampleServerTask";

export const schedulingTasks = cron.schedule(
  "* * * * *",
  async () => {
    await sampleServerTask();
    await healthCheckTask();
  },
  { scheduled: false }
);
