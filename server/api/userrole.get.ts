import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const userrole = await prisma.userRole.findFirst({
        //@todo null find
        where: {
            user: query.user,
            role: query.role


        },
    });


    if (!userrole) {
        throw createError({
            statusCode: 404,
            statusMessage: 'userrole not found',
        });
    }
    else {
        return userrole
    }
}
)