import { Router } from "express";
import { InteractionRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";


export class InteractionRouter {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.post("/view/:id", asyncHandler(InteractionRoutes.recordView));
    this.router.post("/like/:id", asyncHandler(InteractionRoutes.recordLike));
    this.router.get("/:id", asyncHandler(InteractionRoutes.getStats));
  }
}
