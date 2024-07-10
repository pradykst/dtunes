import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // update

    const body = await readBody(event);
    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            username:body.name,
            password:body.password


        },
    });

    const playlist = await prisma.playlist.findFirst({
        where: {
            userId:user?.id,
            name:body.playlistName,


        },
    });



    if(user && playlist){

    
    const update = await prisma.userContent.update({
        where: {
            id:body.userContentId
        },
        data: {
            playlistId:playlist.id
        }
    })
    return { status: 'ok', update }




}
})