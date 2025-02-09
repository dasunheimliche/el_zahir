import { Request, Response, NextFunction } from "express";
import { JwtService } from "../infraestructure/security/jwt.service";
import { TokenPayload } from "../../components/auth/domain/auth.dto";
import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

function isValidUserRole(role: any): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authentication token is required" });
      return;
    }

    const token = authHeader.substring(7);
    const jwtService = new JwtService();
    const decodedToken = await jwtService.verifyAccessToken(token);

    if (!isValidUserRole(decodedToken.role)) {
      res.status(401).json({ error: "Invalid token role" });
      return;
    }

    req.user = {
      userId: decodedToken.userId,
      username: decodedToken.username,
      role: decodedToken.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireRoles = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Insufficient permissions" });
      return;
    }

    next();
  };
};
