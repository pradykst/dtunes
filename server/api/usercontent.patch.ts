import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const usercontent = await prisma.userContent.findFirst({
        where: {
            // username:body.username,
            // password:body.password


        },
    });

    if(usercontent){

    
    const update = await prisma.userContent.update({
        where: {
            id:usercontent.id
        },
        data: {
            // password: body.newpwd
        }
    })
    return { status: 'ok', update }




}
})