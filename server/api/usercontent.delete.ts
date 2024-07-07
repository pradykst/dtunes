import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const usercontent = await prisma.userContent.findFirst({
        where: {
            // username: body.username,
            // password:body.password


        },
    });

    if(usercontent){

    
    const del = await prisma.userContent.delete({
        where: {
            id:usercontent.id       
        },
      });   
      console.log(del)

    }



    


}
)