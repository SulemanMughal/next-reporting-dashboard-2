const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function change_user_country(){
    const all_users = await prisma.user.findMany({});
    // console.debug(all_users)
    all_users.map((item, index) => { 
        prisma.user.update({
            where : {
                id : item.id
            },
            data : {
                country : "PK"
            }
        }).then(res => {
            console.debug(res)
        }).catch(error => {
            console.debug(error)
        })
        new Promise(resolve => setTimeout(resolve, 100));
    })
}


change_user_country()