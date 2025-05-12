import { Router } from "express";
import { AuthRoutes } from "./routes";
import { asyncHandler } from "../../utils/helpers/asyncHandler";

export class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.post("/register", asyncHandler(AuthRoutes.register));
    this.router.post("/login", asyncHandler(AuthRoutes.login));
  }
}
