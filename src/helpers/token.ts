import jwt from "jsonwebtoken";

import User from "../models/user";

type Authenticateable = User;

export const generateTokenAndSetHeader = function (
  res: any,
  instance: Authenticateable
) {
  const token = jwt.sign(
    { modelId: instance.id, modelMail: instance.email },
    process.env.TOKEN_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  res.set({ "X-Auth-Token": token });
};
