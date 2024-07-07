import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const role = await prisma.role.findFirst({
        where: {
            name:body.name
        },
    });

    if(role){

    
    const update = await prisma.role.update({
        where: {
            id:role.id
        },
        data: {
            name: body.newname,
            description: body.description

        }
    })
    return { status: 'ok', update }




}
})