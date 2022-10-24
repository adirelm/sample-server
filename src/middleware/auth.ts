import jwt from "jsonwebtoken";
import { ApiError } from "../helpers/error";

export const isAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("X-Auth-Token");
    if (!token) throw new ApiError(401, "Unauthorized");
    const decodedToken = jwt.verify(token, "secret");
    if (!decodedToken) throw new ApiError(401, "Unauthorized");

    next();
  } catch (error) {
    next(error);
  }
};
