import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const usercontent = await prisma.userContent.findFirst({
        //@todo null find
        where: {
            // username: query.username,
            // password: query.password


        },
    });


    if (!usercontent) {
        throw createError({
            statusCode: 404,
            statusMessage: 'history is empty',
        });
    }
    else {
        return usercontent
    }
}
)