"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swaggerHandler = (0, express_1.Router)();
/**
 * @swagger
 * /:
 * @ApiIgnore
 *  get:
 *    summary: Redirect base url to baseurl/api
 */
swaggerHandler.get("/", (req, res, next) => {
    res.redirect("/api");
});
exports.default = swaggerHandler;
//# sourceMappingURL=swagger.js.map