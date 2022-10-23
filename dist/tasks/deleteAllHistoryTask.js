"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllHistoryTask = void 0;
const history_1 = __importDefault(require("../models/history"));
const deleteAllHistoryTask = async function () {
    try {
        await history_1.default.destroy({ truncate: true });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteAllHistoryTask = deleteAllHistoryTask;
//# sourceMappingURL=deleteAllHistoryTask.js.map