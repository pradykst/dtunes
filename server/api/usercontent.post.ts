import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)
    const usercontent = await prisma.userContent.create({
        data: body
    })
    return usercontent

    


}
)

