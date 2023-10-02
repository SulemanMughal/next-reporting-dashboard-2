const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create_new_team(team_name){
    try {
        const team = await prisma.team.create({
            data : {
                name : team_name
    
            }
        })
        console.debug(`${team_name} created successfully`)
    } catch (error) {
        console.error(error)
    }
    
}

// Loop to create teams
for (let index = 91 ; index <= 100 ; index++){
   create_new_team(`Team - ${index}`)    
}