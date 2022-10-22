import swaggerJsDoc from "swagger-jsdoc";

const url =
  process.env.NODE_ENV === "production"
    ? "https://sample-server-adir.herokuapp.com/"
    : "http://localhost:3000";

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
        url: url,
      },
    ],
  },
  apis: [__dirname + "../../routes/*.js"],
};

export const specs = swaggerJsDoc(options);
