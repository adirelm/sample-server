"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_1 = require("./helpers/swagger");
const database_1 = __importDefault(require("./helpers/database"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_2 = require("./helpers/swagger");
const cron_1 = require("./helpers/cron");
const server_1 = __importDefault(require("./routes/server"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Routes middleware
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
app.use(swagger_2.validator); // OpenApiValidator
app.use(server_1.default);
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ status: err.status, message: err.message });
});
app.listen({ port: PORT }, async () => {
    try {
        // await sequelize.sync({ force: true });
        await database_1.default.authenticate();
        cron_1.schedulingTasks.start();
        console.log("Listening on port " + PORT);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=app.js.map