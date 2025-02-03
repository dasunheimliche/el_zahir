import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export class JwtService {
  private readonly secret: string;
  private readonly defaultExpiresIn: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined in environment variables");
    }

    this.secret = process.env.JWT_SECRET;
    this.defaultExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
  }

  sign<T extends object>(payload: T, options: jwt.SignOptions = {}): string {
    const signOptions: jwt.SignOptions = {
      expiresIn: this.defaultExpiresIn as StringValue | number | undefined,
      ...options,
    };

    return jwt.sign(payload, this.secret, signOptions);
  }

  verify<T>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded as T;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }

  decode<T>(token: string): T | null {
    const decoded = jwt.decode(token);
    return decoded as T | null;
  }
}
