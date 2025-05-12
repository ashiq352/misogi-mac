import { Router } from "express";
import { PublicGalleryRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class PublicGalleryRouter {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.get(
      "/galleries",
      asyncHandler(PublicGalleryRoutes.listGalleries)
    );
    this.router.get(
      "/galleries/:id",
      asyncHandler(PublicGalleryRoutes.galleryDetail)
    );
    this.router.get(
      "/artworks",
      asyncHandler(PublicGalleryRoutes.filterArtworks)
    );
  }
}
