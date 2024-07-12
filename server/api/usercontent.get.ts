import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
    // read
    const query = getQuery(event)
    console.log(query)

    const user = await prisma.user.findFirst({
        //@todo null find
        where: {
            username: query.name,
            password: query.password


        },
    });



    if (user) {

        const usercontents=await prisma.userContent.findMany({

            where:{
                like:query.like == 'true',
                userId:user.id
            },
            include:{
                content:true
            }
        })

        return usercontents


    }

    else{
        return {
            'status':'unauthorised'
        }
    }

}
)