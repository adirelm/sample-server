"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictEmail = exports.renderSuccess = exports.checkExistenceOfUrl = exports.modifyUrlWithHttpOrHttps = exports.HTTPS = exports.HTTP = void 0;
const error_1 = require("../../helpers/error");
const server_1 = __importDefault(require("../../models/server"));
exports.HTTP = "http";
exports.HTTPS = "https";
const modifyUrlWithHttpOrHttps = function (url) {
    let modifiedUrl = url;
    if (url) {
        const prefix = url.split(":");
        if (prefix[0] !== exports.HTTP && prefix[0] !== exports.HTTPS) {
            modifiedUrl = `http://${url}`;
        }
    }
    return modifiedUrl;
};
exports.modifyUrlWithHttpOrHttps = modifyUrlWithHttpOrHttps;
const checkExistenceOfUrl = async function (url) {
    const record = await server_1.default.findOne({ where: { url } });
    return !!record;
};
exports.checkExistenceOfUrl = checkExistenceOfUrl;
const renderSuccess = function (res, status, message, data) {
    if (status) {
        res.status(status).json({ status, message, data });
    }
};
exports.renderSuccess = renderSuccess;
const restrictEmail = function (admin_mail) {
    const authorizedMail = [
        "adir4455@gmail.com",
        "adir@monkeytech.co.il",
        "idanref@gmail.com",
        "Kipnissroni@gmail.com",
    ];
    const authorizedAdminMail = authorizedMail.find((mail) => admin_mail === mail);
    if (!authorizedAdminMail)
        throw new error_1.ApiError(400, "Unauthorized email");
    return authorizedAdminMail;
};
exports.restrictEmail = restrictEmail;
//# sourceMappingURL=main.js.map