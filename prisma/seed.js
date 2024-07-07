import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let x= Math.floor((Math.random()*100)+5)

async function seed() {
  const user = await prisma.user.create({
    data: {
      username: 'skaushal'+x,
      password: 'hrddsss108',
      name: 'sourav',
      photoURL: 'photo5.png'
    },
  })

  const roleArtist=null
  try{
  const roleMany = await prisma.role.createMany({
    data: [{
      name: 'Viewer',
      description: "cannot upload content",
    },
    {
      name: 'Admin',
      description: "Administrator",
    }]
  })
  roleArtist = await prisma.role.create({
    data:
    {
      name: 'Artist',
      description: "can upload content",
    }
  })}
  catch(e){console.log(e)}

  
  const userrole = await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: roleArtist.id

    },
  })
  const content = await prisma.content.create({
    data: {
      title: '52 bars',
      creatorId: user.id,
      language: 'punjabi',
      genre: 'pop'


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