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
            password:query.password
        },
    });

    //if user is artist then allow create operation


    console.log(user)

    
    if(user){
        const playlists = await prisma.playlist.findMany({
            where: {
                // name:body.playlistName,
                userId:user.id,
                // content: {id:body.contentId}

                

            }
        })
        console.log('playlist:',playlists)
        return playlists




    }

    else{
        alert("unauthorised")
    }

}


)

