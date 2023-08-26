import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

let cachedPrisma: PrismaClient | undefined;

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  if (!cachedPrisma) {
    cachedPrisma = new PrismaClient();
  }

  prismaClient = cachedPrisma;
}

export const db = prismaClient;
