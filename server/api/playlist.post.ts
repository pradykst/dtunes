import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)
    const playlist = await prisma.playlist.create({
        data: body
    })
    return playlist

    


}
)

