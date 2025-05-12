import { Request, Response } from "express";
import status from "http-status";
import { Validator } from "node-input-validator";
import { GalleryHelpers } from "./helpers";
import { AuthenticatedRequest } from "../../types";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/helpers/apiResponse";

export class GalleryRoutes {
  public static create = async (req: AuthenticatedRequest, res: Response) => {
    const validator = new Validator(req.body, {
      name: "required|string",
      artworkRefs: "required|array",
    });

    const matched = await validator.check();
    if (!matched) {
      return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        errors: validator.errors,
      });
    }

    const { name, description, artworkRefs } = req.body;

    const gallery = await GalleryHelpers.createGallery({
      name,
      description,
      artworkRefs,
      publishedAt: new Date(),
    });

    return SuccessResponse(res, status.CREATED, {
      message: "Gallery created.",
      data: gallery,
    });
  };

  public static list = async (_req: Request, res: Response) => {
    const galleries = await GalleryHelpers.getAllGalleries();

    return SuccessResponse(res, status.OK, {
      data: galleries,
    });
  };

  public static detail = async (req: Request, res: Response) => {
    const { id } = req.params;

    const gallery = await GalleryHelpers.getGalleryById(id);

    if (!gallery) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Gallery not found",
      });
    }

    return SuccessResponse(res, status.OK, {
      data: gallery,
    });
  };
}
