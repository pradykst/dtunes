import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)
    const userrole = await prisma.userRole.create({
        data: body
    })
    return userrole

    


}
)

