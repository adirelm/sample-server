"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.ApiError = void 0;
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
        const message = firstError.msg;
        const param = firstError.param;
        throw new ApiError(400, `${param} ${message}`);
    }
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=error.js.map