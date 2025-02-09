import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.register);

    this.router.post("/login", this.authController.login);

    this.router.post("/refresh-token", this.authController.refreshToken);

    this.router.post("/logout", authMiddleware, this.authController.logout);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
