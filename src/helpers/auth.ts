import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { Status as UserStatus } from "../models/user";

import User from "../models/user";
import Server from "../models/server";

type Authenticateable = User;

export const generateTokenAndSetHeader = function (
  res: any,
  instance: Authenticateable
) {
  const token = jwt.sign(
    { modelId: instance.id, modelMail: instance.email },
    process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  res.set({ "X-Auth-Token": token });
};

export const checkUserPermissions = async function (
  userId: number
): Promise<User> {
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(401, "Unauthorized");
  if (user.status !== UserStatus.ACTIVE) {
    throw new ApiError(400, "User on status pending, request denied");
  }

  return user;
};

export const checkServerPermissions = async function (
  serverId: number,
  userId: number
): Promise<Server> {
  const server = await Server.findByPk(serverId);

  if (!server) {
    throw new ApiError(404, "Server not found");
  }

  if (server.adminId !== userId) {
    throw new ApiError(400, "Request denied, you are not the admin");
  }

  return server;
};
