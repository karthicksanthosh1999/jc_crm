import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple Prisma Client instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // Optional: logs SQL queries
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
