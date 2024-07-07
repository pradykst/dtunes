import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const role = await prisma.role.findFirst({
        where: {
            name: body.name

        },
    });

    if(role){

    
    const del = await prisma.role.delete({
        where: {
            id:role.id       
        },
      });   
      console.log(del)

    }



    


}
)