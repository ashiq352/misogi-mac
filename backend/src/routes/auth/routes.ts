import { Request, Response, NextFunction } from "express";
import { Validator } from "node-input-validator";
import status from "http-status";
import { AuthHelpers } from "./helpers";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/helpers/apiResponse";
import { getJWTToken } from "../../utils/jwt";
import { User } from "../../db/user";

export class AuthRoutes {
  public static register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validator = new Validator(req.body, {
        email: "required|email",
        password: "required|minLength:6",
        fullName: "required|string",
        role: "required|string",
      });

      const matched = await validator.check();
      if (!matched) {
        return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
          message: "Validation failed",
          errors: validator.errors,
        });
      }

      const { email, password, fullName, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return ErrorResponse(res, status.BAD_REQUEST, {
          message: "User already exists",
        });
      }

      const user = await AuthHelpers.createUser({
        email,
        password,
        fullName,
        role,
      });

      const token = getJWTToken(user);

      return SuccessResponse(res, status.OK, {
        message: "User registered successfully",
        data: { token, user },
      });
    } catch (error) {
      next(error);
    }
  };

  public static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validator = new Validator(req.body, {
        email: "required|email",
        password: "required",
      });

      const matched = await validator.check();
      if (!matched) {
        return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
          message: "Validation failed",
          errors: validator.errors,
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return ErrorResponse(res, status.UNAUTHORIZED, {
          message: "Invalid email or password",
        });
      }

      const token = getJWTToken(user);

      return SuccessResponse(res, status.OK, {
        message: "Login successful",
        data: { token, user },
      });
    } catch (error) {
      next(error);
    }
  };
}
