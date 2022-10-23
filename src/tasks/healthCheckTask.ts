import { Status as ServerStatus } from "../models/history";
import { sendMailToAdmin } from "../helpers/email";

import Server from "../models/server";

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

      if (
        successCounter === CONDITION_TO_SUCCESS &&
        server.status !== ServerStatus.SUCCESS
      ) {
        await server.update({ status: ServerStatus.SUCCESS });
        await sendMailToAdmin(
          server.name,
          server.url,
          server.status,
          server.admin_mail
        );
      } else if (
        failureCounter === CONDITION_TO_FAILURE &&
        server.status !== ServerStatus.FAILURE
      ) {
        await server.update({ status: ServerStatus.FAILURE });
        await sendMailToAdmin(
          server.name,
          server.url,
          server.status,
          server.admin_mail
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};
