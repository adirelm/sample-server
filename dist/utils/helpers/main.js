"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictEmail = exports.renderSuccess = exports.modifyUrlWithHttpOrHttps = exports.HTTPS = exports.HTTP = void 0;
const error_1 = require("../../helpers/error");
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
        throw new error_1.ApiError(400, "Unauthorized email, contact administrator for permissions");
    return authorizedAdminMail;
};
exports.restrictEmail = restrictEmail;
//# sourceMappingURL=main.js.map