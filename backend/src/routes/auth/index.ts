import { Router } from "express";
import { AuthRoutes } from "./routes";

export class AuthRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.router.get("/me", AuthRoutes.me);
  }
}
