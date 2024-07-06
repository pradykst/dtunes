import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event) =>{
  const users = prisma.user.findMany({
      select: {
        username: true
      }
    })
  console.log('users',users)
  return users
  }
  )
