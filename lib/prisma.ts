import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client Singleton Pattern
 * Prevents multiple instances of PrismaClient in development due to hot reloading
 *
 * @see https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Helper to safely disconnect Prisma client
 * Useful for testing and cleanup
 */
export async function disconnectPrisma() {
  await prisma.$disconnect()
}
