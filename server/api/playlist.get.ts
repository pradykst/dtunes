import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const playlist = await prisma.playlist.findFirst({
        //@todo null find
        where: {
            name: query.name
        },
    });


    if (!playlist) {
        throw createError({
            statusCode: 404,
            statusMessage: 'playlist not found',
        });
    }
    else {
        return playlist
    }
}
)