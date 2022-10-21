import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./helpers/database";
import serverHandler from "./routes/server";

const app = express();

app.use(bodyParser.json());

// Routes middleware
app.use(serverHandler);

app.listen({ port: 3000 }, async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("Listening on port 3000");
  } catch (err) {
    console.log(err);
  }
});
