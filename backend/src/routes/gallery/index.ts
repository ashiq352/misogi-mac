import { Router } from "express";
import { GalleryRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class GalleryRouter {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.post("/", asyncHandler(GalleryRoutes.create));
    this.router.get("/", asyncHandler(GalleryRoutes.list));
    this.router.get("/:id", asyncHandler(GalleryRoutes.detail));
  }
}