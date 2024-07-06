import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const user = await prisma.user.findFirst({
        where: {
            username: query.username


        },
    });


    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'user not found',
        });
    }
    else {
        return user
    }
}
)