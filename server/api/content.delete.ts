import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const content = await prisma.content.findFirst({
        where: {
            title: body.title,
            creator:body.creator


        },
    });

    if(content){

    
    const del = await prisma.content.delete({
        where: {
            id:content.id       
        },
      });   
      console.log(del)

    }



    


}
)