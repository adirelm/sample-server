"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMessage = exports.handleValidationErrors = exports.ApiError = void 0;
const express_validator_1 = require("express-validator");
class ApiError extends Error {
    constructor(status, message, data = {}) {
        super(message);
        this.status = status;
        this.data = data;
    }
}
exports.ApiError = ApiError;
const handleValidationErrors = function (req) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        const message = firstError.msg.toLowerCase();
        const param = firstError.param.toLowerCase();
        throw new ApiError(400, `${param} ${message}`);
    }
};
exports.handleValidationErrors = handleValidationErrors;
const handleErrorMessage = function (error) {
    var _a;
    return ((_a = error === null || error === void 0 ? void 0 : error.original) === null || _a === void 0 ? void 0 : _a.detail)
        ? `${error.message}: ${error.original.detail}`
        : error.message;
};
exports.handleErrorMessage = handleErrorMessage;
//# sourceMappingURL=error.js.map