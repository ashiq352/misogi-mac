import { Request, Response, NextFunction } from "express";
import status from "http-status";

import { Validator } from "node-input-validator";
import { ErrorResponse, SuccessResponse } from "../../utils/helpers/apiResponse";
import { awsHelpers } from "./helpers";

export class AwsRoutes {
  public static getPreSignedUrl = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const validator = new Validator(req.body, {
        files: "required|array",
        "files.*.fileName": "required|string",
        "files.*.fileType": "required|string",
      });

      const matched = await validator.check();

      if (!matched) {
        return ErrorResponse(res, status.BAD_REQUEST, {
          message: "Validation Error",
          errors: validator.errors,
        });
      }

      const body = req.body;

      const promises = [];

      for (let index = 0; index < body.files.length; index++) {
        const element = body.files[index];
        promises.push(
          awsHelpers.getSignedUrl(element.fileName, element.fileType),
        );
      }

      const data = await Promise.all(promises);

      return SuccessResponse(res, status.OK, {
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
