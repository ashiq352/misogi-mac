import { Router } from "express";
import { ArtworkRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class ArtworkRouter {
  router: Router;

  constructor() {
    this.router = Router();

    // Artist actions
    this.router.post("/", asyncHandler(ArtworkRoutes.create));
    this.router.get("/me", asyncHandler(ArtworkRoutes.getMyArtworks));
    this.router.get("/approved", asyncHandler(ArtworkRoutes.getApproved));
    this.router.put("/:id", asyncHandler(ArtworkRoutes.update));
    this.router.delete("/:id", asyncHandler(ArtworkRoutes.remove));

    // Curator actions
    this.router.get("/review", asyncHandler(ArtworkRoutes.getPending));
    this.router.patch("/:id/approve", asyncHandler(ArtworkRoutes.approve));
    this.router.patch("/:id/reject", asyncHandler(ArtworkRoutes.reject));
  }
}
