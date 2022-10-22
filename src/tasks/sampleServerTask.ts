import axios from "axios";
import now from "performance-now";
import { Status as ServerStatus } from "../models/history";

import Server from "../models/server";

const TIME_FOR_FAILURE = 60;

export const sampleServerTask = async function () {
  const servers = await Server.findAll();

  servers.forEach(async (server) => {
    const url = server.url;
    const startTime = now();
    const response = await axios.get(url);
    const endTime = now();
    const responseTime = (endTime - startTime) / 1000;

    if (response.statusText === "OK" && responseTime < TIME_FOR_FAILURE) {
      await server.$create("histroy", { status: ServerStatus.SUCCESS });
    } else {
      await server.$create("histroy", { status: ServerStatus.FAILURE });
    }
  });
};
