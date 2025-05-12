import { Request, NextFunction, Response } from "express";
import httpStatus from "http-status";
import { envConfig } from "../config/env";
import { AuthenticatedRequest } from "../types";
import { verifyJWT } from "../utils/jwt";
import { User } from "../db/user";
import { ErrorResponse } from "../utils/helpers/apiResponse";
import { STATUS } from "../utils/enums/enums";

export class Middleware {
  JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = envConfig.JWT_SECRET;
  }
  public jwtDecoder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) return next();

      if (authorizationHeader.includes("Bearer")) {
        authorizationHeader = authorizationHeader.split(" ")[1];
      }

      const decoded = await verifyJWT(authorizationHeader);

      if (typeof decoded !== "object" || !("_id" in decoded)) {
        return ErrorResponse(res, httpStatus.UNAUTHORIZED, {
          message: "Invalid Token Payload",
        });
      }

      const user = await User.findOne({ _id: decoded._id });

      if (!user) {
        return ErrorResponse(res, httpStatus.UNAUTHORIZED, {
          message: "Invalid Token",
        });
      }

      if (user.status === STATUS.INACTIVE) {
        return ErrorResponse(res, httpStatus.UNAUTHORIZED, {
          message: "Inactive user.",
        });
      }

      (req as AuthenticatedRequest).user = user;
      (req as AuthenticatedRequest).token = decoded;

      return next();
    } catch (error) {
      return ErrorResponse(res, httpStatus.UNAUTHORIZED, {
        message: "Invalid Token",
      });
    }
  };
}
