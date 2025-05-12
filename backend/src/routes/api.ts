import { Router } from "express";
import { AuthRouter } from "./auth";


export const api = Router();

api.use("/auth", new AuthRouter().router);