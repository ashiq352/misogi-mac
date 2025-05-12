import { Request, Response } from "express";
import status from "http-status";
import { PublicGalleryHelpers } from "./helpers";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../utils/helpers/apiResponse";

export class PublicGalleryRoutes {
  public static listGalleries = async (_req: Request, res: Response) => {
    const galleries = await PublicGalleryHelpers.getPublishedGalleries();
    return SuccessResponse(res, status.OK, { data: galleries });
  };

  public static galleryDetail = async (req: Request, res: Response) => {
    const { id } = req.params;

    const gallery = await PublicGalleryHelpers.getGalleryById(id);

    if (!gallery) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Gallery not found",
      });
    }

    return SuccessResponse(res, status.OK, { data: gallery });
  };

  public static filterArtworks = async (req: Request, res: Response) => {
    const { tag, artist, medium } = req.query;

    const artworks = await PublicGalleryHelpers.filterArtworks({
      tag: tag as string,
      artist: artist as string,
      medium: medium as string,
    });

    return SuccessResponse(res, status.OK, { data: artworks });
  };
}
