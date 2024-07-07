import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const content = await prisma.content.findFirst({
        //@todo null find
        where: {
            title: query.title,
            creator: query.creator


        },
    });


    if (!content) {
        throw createError({
            statusCode: 404,
            statusMessage: 'content not found',
        });
    }
    else {
        return content
    }
}
)