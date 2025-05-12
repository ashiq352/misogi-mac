import { Router } from "express";
import { AuthRouter } from "./auth";
import { Middleware } from "../middleware/auth";
import { asyncHandler } from "../utils/helpers/asyncHandler";

const middleware = new Middleware();

export const api = Router();
api.use(asyncHandler(middleware.jwtDecoder));

api.use("/auth", new AuthRouter().router);