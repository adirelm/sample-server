import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./helpers/database";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import serverHandler from "./routes/server";

const PORT = process.env.PORT ?? 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample server",
      version: "1.0.0",
      description: "Sample servers on the web",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [__dirname + "/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(bodyParser.json());

// Routes middleware
app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));
app.use(serverHandler);

app.listen({ port: PORT }, async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("Listening on port 3000");
  } catch (err) {
    console.log(err);
  }
});
