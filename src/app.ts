import express from "express";
import bodyParser from "body-parser";
import { specs } from "./helpers/swagger";
import sequelize from "./helpers/database";
import { ApiError } from "./helpers/error";
import swaggerUI from "swagger-ui-express";
import { validator } from "./helpers/swagger";
import { startScheduledTasks } from "./helpers/cron";

import authRouter from "./routes/auth";
import serverHandler from "./routes/server";
import historyHandler from "./routes/history";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(bodyParser.json());

// Routes middleware
app.use(swaggerUI.serve, swaggerUI.setup(specs));
app.use(validator); // OpenApiValidator
app.use(serverHandler);
app.use(historyHandler);
app.use(authRouter);

app.get("/");

app.use((err: ApiError, req: any, res: any, next: any) => {
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message });
});

app.listen({ port: PORT }, async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    startScheduledTasks();
    console.log("Listening on port " + PORT);
  } catch (err) {
    console.log(err);
  }
});
