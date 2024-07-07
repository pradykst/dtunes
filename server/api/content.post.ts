import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
// create

    const body = await readBody(event);
    console.log(body)
    
    const user = await prisma.user.findFirst({
        //@todo null find
        where: {
            username: body.name,
            password:body.password
        },
    });

    //if user is artist then allow create operation

    const userrole = await prisma.userRole.findFirst({
        //@todo null find
        where: {
            userId: user?.id,
            role:{
                name:"Artist"
            }
        },
    });

    console.log(user)
    console.log(userrole)

    if(userrole){
        //@todo why is explicit id required in creation where as in retrival we can give the object directly
        body.content.creatorId = user?.id
        const content = await prisma.content.create({
            data: body.content
        })
        return content

    }

    else{
        return {"messaga":"not authorised"}
    }

  







    


}
)

