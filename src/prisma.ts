//src/prisma.ts
import { PrismaClient } from "./generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
console.log("DATABASE_URL RAW =", process.env.DATABASE_URL);


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log("DATABASE_URL RAW =", process.env.DATABASE_URL);

const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
