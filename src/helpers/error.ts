export class ApiError extends Error {
  status: number;
  data: Object;

  constructor(status: number, message: string, data: Object = {}) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
