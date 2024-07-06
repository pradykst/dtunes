import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.create({
    data: {
      username: 'rkaushal',
      password: 'hr108',
      name: 'radhika',
      photoURL: 'photo1.png'
    },
  })
}



try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}