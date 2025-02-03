import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../domain/auth.dto";

export class AuthRepository {
  constructor(private prisma = new PrismaClient()) {}

  async createUser(userData: CreateUser) {
    const { username, email, password, name, lastname } = userData;

    return this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash: password,
        profile: {
          name,
          lastname,
        },
      },
    });
  }
}
