import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import crypto from "crypto";
import type { StringValue } from "ms";
import { AppConfig, config } from "../config/config";

interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export class JwtService {
  private config: AppConfig;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.config = config;
  }

  async generateTokens(user: User) {
    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.config.jwt.accessSecret, {
      expiresIn: this.config.jwt.accessExpiration as StringValue,
    });

    const refreshToken = crypto.randomBytes(40).toString("hex");
    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setDate(refreshTokenExpiration.getDate() + 7); // 7 días

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: refreshTokenExpiration,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.config.jwt.accessExpiration,
    };
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(
        token,
        this.config.jwt.accessSecret
      ) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenDoc = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenDoc || tokenDoc.isRevoked || tokenDoc.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    const payload: TokenPayload = {
      userId: tokenDoc.user.id,
      username: tokenDoc.user.username,
      role: tokenDoc.user.role,
    };

    const newAccessToken = jwt.sign(payload, this.config.jwt.accessSecret, {
      expiresIn: this.config.jwt.accessExpiration as StringValue,
    });

    return {
      accessToken: newAccessToken,
      expiresIn: this.config.jwt.accessExpiration,
    };
  }

  async revokeRefreshToken(token: string) {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }
}
