import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const role = await prisma.role.findFirst({
        //@todo null find
        where: {
            name: query.name
        },
    });


    if (!role) {
        throw createError({
            statusCode: 404,
            statusMessage: 'role not found',
        });
    }
    else {
        return role
    }
}
)