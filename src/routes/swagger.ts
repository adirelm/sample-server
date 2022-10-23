import { Router } from "express";

const swaggerHandler = Router();

/**
 * @swagger
 * /:
 * @ApiIgnore
 *  get:
 *    summary: Redirect base url to baseurl/api
 */

swaggerHandler.get("/", (req: any, res: any, next: any) => {
  res.redirect("/api");
});

export default swaggerHandler;
