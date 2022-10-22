import { validationResult } from "express-validator";

export class ApiError extends Error {
  status: number;
  data: Object;

  constructor(status: number, message: string, data: Object = {}) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const handleValidationErrors = function (req: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    const message = firstError.msg.toLowerCase();
    const param =
      firstError.param[0].toUpperCase() +
      firstError.param.slice(1, firstError.param.length);

    throw new ApiError(400, `${param} ${message}`);
  }
};
