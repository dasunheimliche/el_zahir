import { CreateUserDto } from "../../domain/auth.dto";
import { AuthService } from "../../domain/auth.service";
import { Request, Response } from "express";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      console.log(this.authService);

      const createdUser = await this.authService.register(userData);
      res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        const prismaError = error as {
          code: string;
          meta?: { target?: string[] };
        };

        res.status(409).json({
          error: "Username or email already exists",
          field: prismaError.meta?.target?.[0],
        });
        return;
      }

      if (error instanceof Error) {
        res.status(500).json({
          error: "Internal server error",
          details: error.message,
        });
      } else {
        res.status(500).json({
          error: "Unknown error occurred",
        });
      }
    }
  };
}
