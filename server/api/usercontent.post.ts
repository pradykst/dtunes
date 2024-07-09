import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            username: body.name,
            password:body.password
        },
    });

    let content = await prisma.content.findFirst({
        where: {
            title: body.title
        }
    });


    if(user&&content){
        
        let usercontent = await prisma.userContent.findFirst({
            where: {
                userId:user.id,
                contentId:content.id,
            }
        })

        if(usercontent){
        usercontent = await prisma.userContent.update({
            where: {
                id:usercontent.id
            },
            data: {
                like:body.like
            }
        })
    }
        else{
            usercontent = await prisma.userContent.create({
                data: {
                    userId:user.id,
                    contentId:content.id,
                    like:body.like
                }
            })
        }
        return usercontent

    }

    else{
        return {msg:'not found'}
    }




    


}
)

