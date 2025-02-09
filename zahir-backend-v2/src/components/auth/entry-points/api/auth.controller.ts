import { CreateUserDto, LoginDto } from "../../domain/auth.dto";
import { AuthService } from "../../domain/auth.service";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDto = plainToInstance(CreateUserDto, req.body);
      const errors = await validate(userDto);

      if (errors.length > 0) {
        res.status(400).json({
          error: "Validation failed",
          details: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
        return;
      }

      const result = await this.authService.register(userDto);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
        expiresIn: result.expiresIn,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const loginDto = plainToInstance(LoginDto, req.body);
      const errors = await validate(loginDto);

      if (errors.length > 0) {
        res.status(400).json({
          error: "Validation failed",
          details: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
        return;
      }

      const result = await this.authService.login(loginDto);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      res.json({
        user: result.user,
        accessToken: result.accessToken,
        expiresIn: result.expiresIn,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ error: "Refresh token not found" });
        return;
      }

      const result = await this.authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      res.clearCookie("refreshToken");
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError(error: any, res: Response): void {
    console.error("Auth error:", error);

    if (
      error.name === "PrismaClientKnownRequestError" &&
      error.code === "P2002"
    ) {
      const field = error.meta?.target?.[0];
      res.status(409).json({
        error: `${field} already exists`,
        field,
      });
      return;
    }

    if (error.message === "Invalid credentials") {
      res.status(401).json({
        error: "The username or password you entered is incorrect",
      });
      return;
    }

    if (error.message === "Account is disabled") {
      res.status(403).json({
        error: "Your account has been disabled. Please contact support.",
      });
      return;
    }

    if (error.message === "Invalid refresh token") {
      res.status(401).json({
        error: "Session expired. Please login again.",
      });
      return;
    }

    res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
