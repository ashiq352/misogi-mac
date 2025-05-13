import { Request, Response } from "express";
import status from "http-status";
import { Validator } from "node-input-validator";
import { ArtworkHelpers } from "./helpers";
import { AuthenticatedRequest } from "../../types";
import { ARTWORK_STATUS } from "../../utils/enums/enums";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/helpers/apiResponse";
import { Artwork } from "../../db/artwork";
import mongoose from "mongoose";
import { Tag } from "../../db/tag";

export class ArtworkRoutes {
  public static create = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;

    const validator = new Validator(req.body, {
      title: "required|string",
      imageUrl: "required|url",
      medium: "required|string",
      dimensions: "required|string",
    });

    const matched = await validator.check();
    if (!matched) {
      return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        errors: validator.errors,
      });
    }

    const { title, description, imageUrl, medium, dimensions, tags } = req.body;

    const artwork = await ArtworkHelpers.createArtwork({
      artistRef: user._id,
      title,
      description,
      imageUrl,
      medium,
      dimensions,
      tags,
      status: ARTWORK_STATUS.PENDING,
    });

    return SuccessResponse(res, status.CREATED, {
      message: "Artwork submitted.",
      data: artwork,
    });
  };

  public static getMyArtworks = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const user = req.user!;
    const artworks = await ArtworkHelpers.getArtistArtworks(
      user._id.toString()
    );

    return SuccessResponse(res, status.OK, {
      data: artworks,
    });
  };

  public static update = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    const artwork = await Artwork.findOne({ _id: id, artistRef: user._id });

    if (!artwork) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Artwork not found.",
      });
    }

    if (artwork.status !== ARTWORK_STATUS.PENDING) {
      return ErrorResponse(res, status.BAD_REQUEST, {
        message: "Only pending artworks can be updated.",
      });
    }

    const updated = await ArtworkHelpers.updateArtwork(id, req.body);

    return SuccessResponse(res, status.OK, {
      message: "Artwork updated.",
      data: updated,
    });
  };

  public static remove = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    const artwork = await Artwork.findOne({ _id: id, artistRef: user._id });

    if (!artwork) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Artwork not found.",
      });
    }

    if (artwork.status !== ARTWORK_STATUS.PENDING) {
      return ErrorResponse(res, status.BAD_REQUEST, {
        message: "Only pending artworks can be deleted.",
      });
    }

    await ArtworkHelpers.deleteArtwork(id);

    return SuccessResponse(res, status.OK, {
      message: "Artwork deleted.",
    });
  };

  public static getPending = async (_req: Request, res: Response) => {
    const pending = await ArtworkHelpers.getPendingArtworks();

    return SuccessResponse(res, status.OK, {
      data: pending,
    });
  };

  public static approve = async (req: AuthenticatedRequest, res: Response) => {
    const validator = new Validator(req.body, {
      tags: "required|array",
      feedback: "required|string",
    });

    const matched = await validator.check();
    if (!matched) {
      return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        errors: validator.errors,
      });
    }

    const { id } = req.params;
    const { tags, feedback } = req.body;

    // Create or find tag documents
    const tagDocs = await Promise.all(
      tags.map((name: string) =>
        Tag.findOneAndUpdate({ name }, { name }, { new: true, upsert: true })
      )
    );
    const tagIds = tagDocs.map((tag) => tag._id);

    const artwork = await Artwork.findByIdAndUpdate(
      id,
      {
        status: ARTWORK_STATUS.APPROVED,
        tags: tagIds,
        feedback,
        approvedBy: req.user!._id,
      },
      { new: true }
    );

    if (!artwork) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Artwork not found",
      });
    }

    return SuccessResponse(res, status.OK, {
      message: "Artwork approved",
      data: artwork,
    });
  };

  public static reject = async (req: AuthenticatedRequest, res: Response) => {
    const validator = new Validator(req.body, {
      tags: "required|array",
      feedback: "required|string",
    });

    const matched = await validator.check();
    if (!matched) {
      return ErrorResponse(res, status.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        errors: validator.errors,
      });
    }

    const { id } = req.params;
    const { tags, feedback } = req.body;

    const tagDocs = await Promise.all(
      tags.map((name: string) =>
        Tag.findOneAndUpdate({ name }, { name }, { new: true, upsert: true })
      )
    );
    const tagIds = tagDocs.map((tag) => tag._id);

    const artwork = await Artwork.findByIdAndUpdate(
      id,
      {
        status: ARTWORK_STATUS.REJECTED,
        tags: tagIds,
        feedback,
        approvedBy: req.user!._id,
      },
      { new: true }
    );

    if (!artwork) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Artwork not found",
      });
    }

    return SuccessResponse(res, status.OK, {
      message: "Artwork rejected",
      data: artwork,
    });
  };
  public static getApproved = async (_req: Request, res: Response) => {
    const artworks = await Artwork.find({ status: ARTWORK_STATUS.APPROVED })
      .populate("tags", "name")
      .populate("artistRef", "fullName");

    return SuccessResponse(res, status.OK, {
      data: artworks,
    });
  };
}
