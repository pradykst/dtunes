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


    console.log(user)

    
    if(user){
        const playlist = await prisma.playlist.create({
            data: {
                name:body.playlistName,
                userId:user.id,
                UserContent: {connect:{id:body.userContentId}}

                

            }
        })


    }

    else{
        alert("unauthorised")
    }

}
)




