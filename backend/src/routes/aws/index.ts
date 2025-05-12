import { Router } from "express";
import { AwsRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class AwsRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.router.post("/presigned-url", asyncHandler(AwsRoutes.getPreSignedUrl));
  }
}
