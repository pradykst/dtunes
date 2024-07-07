import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const playlist = await prisma.playlist.findFirst({
        where: {
            name: body.name
        },
    });

    if(playlist){

    
    const del = await prisma.playlist.delete({
        where: {
            id:playlist.id       
        },
      });   
      console.log(del)

    }



    


}
)