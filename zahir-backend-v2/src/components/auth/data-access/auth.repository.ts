import { PrismaClient, User, UserRole } from "@prisma/client";
import { CreateUserDto } from "../domain/auth.dto";

export class AuthRepository {
  constructor(private prisma = new PrismaClient()) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const {
      username,
      email,
      password: passwordHash,
      name,
      lastname,
    } = userData;

    return this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: UserRole.USER,
        profile: {
          name,
          lastname,
        },
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  async findRefreshTokenByToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async saveRefreshToken(userId: string, token: string, expiresAt: Date) {
    return this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async deleteRefreshToken(token: string) {
    return this.prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteAllUserRefreshTokens(userId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async updateUserRole(userId: string, role: UserRole) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async deactivateUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        refreshTokens: {
          updateMany: {
            where: { userId },
            data: { isRevoked: true },
          },
        },
      },
    });
  }

  async activateUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
  }

  async cleanExpiredRefreshTokens() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isRevoked: true }],
      },
    });
  }
}
