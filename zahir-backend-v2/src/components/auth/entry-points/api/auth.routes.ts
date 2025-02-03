import { Router } from "express";
import { AuthController } from "../entry-points/api/auth.controller";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", authController.register);
