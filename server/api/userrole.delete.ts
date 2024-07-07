import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // delete
    const query = getQuery(event)
    console.log(query)

    const body = await readBody(event);
    console.log(body)

    const userrole = await prisma.userRole.findFirst({
        where: {
            user: body.user,
            role:body.role


        },
    });

    if(userrole){

    
    const del = await prisma.userRole.delete({
        where: {
            id:userrole.id       
        },
      });   
      console.log(del)

    }



    


}
)