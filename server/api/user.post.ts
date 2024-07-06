import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)
    const user = await prisma.user.create({
        data: body
    })
    return {status:'ok',user}

    


}
)

