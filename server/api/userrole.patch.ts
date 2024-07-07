import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const userrole = await prisma.userRole.findFirst({
        where: {
            user:body.user,
            role:body.role


        },
    });

    if(userrole){

    
    const update = await prisma.userRole.update({
        where: {
            id:userrole.id
        },
        data: {
            role: body.newrole
        }
    })
    return { status: 'ok', update }




}
})