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
exports.healthCheckTask = void 0;
const history_1 = require("../models/history");
const server_1 = __importDefault(require("../models/server"));
const CONDITION_TO_SUCCESS = 5;
const CONDITION_TO_FAILURE = 3;
const healthCheckTask = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const servers = yield server_1.default.findAll();
        servers.forEach((server) => __awaiter(this, void 0, void 0, function* () {
            const history = yield server.$get("histroy", {
                order: [["createdAt", "DESC"]],
                limit: 5,
            });
            let successCounter = 0;
            let failureCounter = 0;
            history.forEach((record) => {
                record.status === history_1.Status.SUCCESS
                    ? successCounter++
                    : failureCounter++;
            });
            if (successCounter === CONDITION_TO_SUCCESS) {
                yield server.update({ status: history_1.Status.SUCCESS });
            }
            else if (successCounter === CONDITION_TO_FAILURE) {
                yield server.update({ status: history_1.Status.FAILURE });
            }
        }));
    });
};
exports.healthCheckTask = healthCheckTask;
//# sourceMappingURL=healthCheckTask.js.map