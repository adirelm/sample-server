import swaggerJsDoc from "swagger-jsdoc";

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
  apis: [__dirname + "../../routes/*.js"],
};

export const specs = swaggerJsDoc(options);
