"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./helpers/database");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./helpers/swagger");
const cron_1 = require("./helpers/cron");
const server_1 = __importDefault(require("./routes/server"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Routes middleware
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
app.use(server_1.default);
app.listen({ port: PORT }, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await sequelize.sync({ force: true });
        yield database_1.sequelize.authenticate();
        cron_1.schedulingTasks.start();
        console.log("Listening on port 3000");
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=app.js.map