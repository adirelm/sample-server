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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleServerTask = void 0;
const axios_1 = __importDefault(require("axios"));
const performance_now_1 = __importDefault(require("performance-now"));
const history_1 = require("../models/history");
const server_1 = __importDefault(require("../models/server"));
const TIME_FOR_FAILURE = 60;
const sampleServerTask = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const servers = yield server_1.default.findAll();
        servers.forEach((server) => __awaiter(this, void 0, void 0, function* () {
            const url = server.url;
            const startTime = (0, performance_now_1.default)();
            const response = yield axios_1.default.get(url);
            const endTime = (0, performance_now_1.default)();
            const responseTime = (endTime - startTime) / 1000;
            if (response.statusText === "OK" && responseTime < TIME_FOR_FAILURE) {
                yield server.$create("histroy", { status: history_1.Status.SUCCESS });
            }
            else {
                yield server.$create("histroy", { status: history_1.Status.FAILURE });
            }
        }));
    });
};
exports.sampleServerTask = sampleServerTask;
//# sourceMappingURL=sampleServerTask.js.map