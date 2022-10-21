import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { Server } from "./models/server";

export const sequelize = new Sequelize(
  "sample-server",
  "postgres",
  "kofkof12",
  {
    host: "localhost",
    dialect: "postgres",
    models: [Server],
  }
);

const app = express();

app.use(bodyParser.json());

app.listen({ port: 3000 }, async () => {
  try {
    await sequelize.authenticate();
    console.log("Listening on port 3000");
    await Server.create({ id: 1, name: "bla", url: "aaa" });
  } catch (err) {
    console.log(err);
  }
});
