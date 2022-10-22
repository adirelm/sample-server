import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

import Server from "../models/server";
import History from "../models/history";

const serverName = process.env.SERVER_NAME!;
const userName = process.env.USER_NAME!;
const password = process.env.PASSWORD!;
const host = process.env.HOST!;

// export const sequelize = new Sequelize(serverName, userName, password, {
//   host: host,
//   dialect: "postgres",
//   models: [Server, History],
// });
export const sequelize = new Sequelize(
  "sample-server-adir",
  "zmtpbrnahytmdy",
  "1cdbc716d6574fc611b99b4bcf1daae38b32d0ada6c57b8b4cdd85663f6f5824",
  {
    host: "ec2-23-20-140-229.compute-1.amazonaws.com",
    dialect: "postgres",
    models: [Server, History],
  }
);
