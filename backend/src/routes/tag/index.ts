import { Router } from "express";
import { TagRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class TagRouter {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/", asyncHandler(TagRoutes.list));
    this.router.post("/", asyncHandler(TagRoutes.create));
    this.router.delete("/:id", asyncHandler(TagRoutes.remove));
  }
}
