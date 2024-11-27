// Import the PrismaClient from the "@prisma/client" package
import { PrismaClient } from "@prisma/client";

// Declare a global variable "prisma" and set its type as PrismaClient or undefined
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Export a constant "db" that assigns the globalThis.prisma value if it exists, or creates a new instance of PrismaClient
export const db = globalThis.prisma || new PrismaClient();

// If the NODE_ENV environment variable is not set to "production", assign the "db" constant to the globalThis.prisma variable
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
