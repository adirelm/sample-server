import { Status as ServerStatus } from "../models/history";

import Server from "../models/server";
import History from "../models/history";

const CONDITION_TO_SUCCESS = 5;
const CONDITION_TO_FAILURE = 3;

export const healthCheckTask = async function () {
  try {
    const servers = await Server.findAll();

    servers.forEach(async (server) => {
      const history = await server.$get("histroy", {
        order: [["createdAt", "DESC"]],
        limit: 5,
      });

      let successCounter = 0;
      let failureCounter = 0;

      history.forEach((record) => {
        record.status === ServerStatus.SUCCESS
          ? successCounter++
          : failureCounter++;
      });

      if (successCounter === CONDITION_TO_SUCCESS) {
        await server.update({ status: ServerStatus.SUCCESS });
      } else if (failureCounter === CONDITION_TO_FAILURE) {
        await server.update({ status: ServerStatus.FAILURE });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
