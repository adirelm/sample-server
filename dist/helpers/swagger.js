"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const url = process.env.NODE_ENV === "production"
    ? "https://sample-server-adir.herokuapp.com/"
    : "http://localhost:3000";
console.log(url);
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
exports.specs = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map