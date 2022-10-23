import swaggerJsDoc from "swagger-jsdoc";
import * as OpenApiValidator from "express-openapi-validator";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://sample-server-adir.herokuapp.com/"
    : "http://localhost:3000";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample server",
      version: "1.0.0",
      description: "Sample servers on the web",
    },
    servers: [
      {
        url: URL,
      },
    ],
  },
  apis: [__dirname + "../../routes/*.js"],
};

export const specs = swaggerJsDoc(options) as any;

export const validator = OpenApiValidator.middleware({
  apiSpec: specs,
  validateRequests: true,
  validateResponses: false,
  validateSecurity: false,
});
