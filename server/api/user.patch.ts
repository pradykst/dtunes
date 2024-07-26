import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            username:body.username,
            password:body.password


        },
    });
    console.log(user)

    if(user){

            
    const update = await prisma.user.update({
        where: {
            id:user.id
        },
        data: {
            password: body.newPswd
        }
    })
    console.log(update)
    return { status: 'ok', update }




}
})