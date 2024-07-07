import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const playlist = await prisma.playlist.findFirst({
        where: {
            name:body.name,

        },
    });

    if(playlist){

    
    const update = await prisma.playlist.update({
        where: {
            id:playlist.id
        },
        data: {
            name: body.newname,
            thumbnail: body.thumbnail,
            // content:body.content

        }
    })
    return { status: 'ok', update }




}
})