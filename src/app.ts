import express from "express";
import bodyParser from "body-parser";
import sequelize from "./helpers/database";
import swaggerUI from "swagger-ui-express";
import { specs } from "./helpers/swagger";
import { schedulingTasks } from "./helpers/cron";

import serverHandler from "./routes/server";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(bodyParser.json());

// Routes middleware
app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));
app.use(serverHandler);

app.listen({ port: PORT }, async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log(PORT);
    console.log(process.env.NODE_ENV);
    schedulingTasks.start();
    console.log("Listening on port " + PORT);
  } catch (err) {
    console.log(err);
  }
});
