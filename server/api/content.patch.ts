import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const content = await prisma.content.findFirst({
        where: {
            title:body.title,
            creator:body.creator


        },
    });

    if(content){

    
    const update = await prisma.content.update({
        where: {
            id:content.id
        },
        data: {
            genre: body.genre,
            thumbnail:body.thumbnail
        }
    })
    return { status: 'ok', update }




}
})