import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../helpers/error";

interface Jwt extends JwtPayload {
  modelId: string;
  modelMail: string;
}

export const isAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("X-Auth-Token");
    if (!token) throw new ApiError(401, "Unauthorized");
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as Jwt;
    if (!decodedToken) throw new ApiError(401, "Unauthorized");
    if (!decodedToken.modelId || !decodedToken.modelMail)
      throw new ApiError(400, "Can't fetch user mail or user id from token");
    req.modelId = decodedToken.modelId;
    req.modelMail = decodedToken.modelMail;

    next();
  } catch (error) {
    next(error);
  }
};
