import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

import Server from "../models/server";
import History from "../models/history";

const serverName = process.env.SERVER_NAME!;
const userName = process.env.USER_NAME!;
const password = process.env.PASSWORD!;
const host = process.env.HOST!;

export const sequelize = new Sequelize(serverName, userName, password, {
  host: host,
  dialect: "postgres",
  models: [Server, History],
});
