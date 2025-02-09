import { PrismaClient, Prisma } from "@prisma/client";

export class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient({
      log: this.getPrismaLogLevels(),
    });

    this.setupPrismaEventHandlers();
  }

  private getPrismaLogLevels(): Prisma.LogDefinition[] {
    if (process.env.NODE_ENV === "development") {
      return [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
      ] as const;
    }
    return [
      { emit: "event", level: "error" },
      { emit: "event", level: "warn" },
    ] as const;
  }

  private setupPrismaEventHandlers() {
    if (process.env.NODE_ENV === "development") {
      (this.prisma.$on as any)("query" as any, (e: any) => {
        console.log("Query: " + e.query);
        console.log("Params: " + e.params);
        console.log("Duration: " + e.duration + "ms");
      });
    }

    (this.prisma.$on as any)("error" as any, (e: any) => {
      console.error("Prisma Error:", e);
    });

    process.on("beforeExit", async () => {
      await this.disconnect();
    });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log("Successfully connected to database");
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log("Successfully disconnected from database");
    } catch (error) {
      console.error("Error disconnecting from database:", error);
      throw error;
    }
  }

  public async cleanDatabase(): Promise<void> {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      const modelNames = Object.keys(this.prisma).filter(
        (key: string) => !key.startsWith("_") && !key.startsWith("$")
      );

      await Promise.all(
        modelNames.map(async (modelName) => {
          if (this.prisma[modelName as keyof PrismaClient]) {
            const model = this.prisma[modelName as keyof PrismaClient] as any;
            if (typeof model.deleteMany === "function") {
              await model.deleteMany();
            }
          }
        })
      );
    } else {
      throw new Error(
        "Database cleaning is only allowed in development or test environment"
      );
    }
  }
}

export const prismaService = PrismaService.getInstance();
