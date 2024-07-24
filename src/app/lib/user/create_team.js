const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();


const bcrypt = require('bcrypt');


// const args = process.argv.slice(2); // Exclude the first four elements (executable path and script path)


// Your function that uses the arguments
async function myFunction() {
  

  try {
    let stringA = ["A", "B", "C","D", "E", "F", "G", "H"]
    for(let i = 0; i < stringA.length; i++){
        const team = await prisma.team.create({
            data: {
                name: `Team ${stringA[i]}`,
            },
        });
        console.log('Team created:', team);
    }

} catch (error) {
    console.error('Error creating team:', error);
} finally {
    await prisma.$disconnect();
}

}

// Call the function with CLI arguments
myFunction();
