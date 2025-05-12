import jwt from "jsonwebtoken";
import { IUserDocument } from "../db/user";
import { envConfig } from "../config/env";

export const getJWTToken = (user: IUserDocument): string => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    envConfig.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, envConfig.JWT_SECRET);
};
