import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

import Server from "../models/server";
import History from "../models/history";

const serverName = process.env.SERVER_NAME!;
const userName = process.env.USER_NAME!;
const password = process.env.PASSWORD!;
const host = process.env.HOST!;
const databaseUrl = process.env.DATABASE_URL!;

let sequelize: Sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(databaseUrl, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    models: [Server, History],
  });
} else {
  sequelize = new Sequelize(serverName, userName, password, {
    host: host,
    dialect: "postgres",
    models: [Server, History],
  });
}

export default sequelize;
