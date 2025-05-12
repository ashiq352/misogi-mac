import { Request, Response } from "express";
import status from "http-status";
import { Validator } from "node-input-validator";
import { TagHelpers } from "./helpers";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/helpers/apiResponse";
import { Tag } from "../../db/tag";

export class TagRoutes {
  public static list = async (_req: Request, res: Response) => {
    const tags = await TagHelpers.getAll();
    return SuccessResponse(res, status.OK, { data: tags });
  };

  public static create = async (req: Request, res: Response) => {
    const validator = new Validator(req.body, {
      name: "required|string",
    });

    const matched = await validator.check();
    if (!matched) {
      return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        errors: validator.errors,
      });
    }

    const { name } = req.body;

    const existing = await Tag.findOne({ name });
    if (existing) {
      return ErrorResponse(res, status.CONFLICT, {
        message: "Tag already exists",
      });
    }

    const tag = await TagHelpers.create(name);

    return SuccessResponse(res, status.CREATED, {
      message: "Tag created",
      data: tag,
    });
  };

  public static remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await TagHelpers.delete(id);

    if (!deleted) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Tag not found",
      });
    }

    return SuccessResponse(res, status.OK, {
      message: "Tag deleted",
    });
  };
}
