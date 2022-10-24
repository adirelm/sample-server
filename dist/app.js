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
const error_1 = require("./helpers/error");
const cron_1 = require("./helpers/cron");
const user_1 = __importDefault(require("./routes/user"));
const server_1 = __importDefault(require("./routes/server"));
const history_1 = __importDefault(require("./routes/history"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Routes middleware
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
app.use(swagger_2.validator); // OpenApiValidator
app.use(server_1.default);
app.use(history_1.default);
app.use(user_1.default);
app.get("/");
app.use((err, req, res, next) => {
    const message = (0, error_1.handleErrorMessage)(err);
    res.status(err.status || 500).json({
        status: err.status,
        message,
    });
});
app.listen({ port: PORT }, async () => {
    try {
        await database_1.default.sync({ force: true });
        await database_1.default.authenticate();
        (0, cron_1.startScheduledTasks)();
        console.log("Listening on port " + PORT);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=app.js.map