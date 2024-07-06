import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            username: body.username,
            password:body.password


        },
    });

    if(user){

    
    const del = await prisma.user.delete({
        where: {
            id:user.id       
        },
      });   
      console.log(del)

    }



    


}
)