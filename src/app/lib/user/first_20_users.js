const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();


const bcrypt = require('bcrypt');


// const args = process.argv.slice(2); // Exclude the first four elements (executable path and script path)


// Your function that uses the arguments
async function myFunction() {
  

  try {
    
    for(let i = 1; i <= 20; i++){
        const user = await prisma.user.create({
            data: {
                email: `user_${i}@gmail.com`,
                name : `user_${i}`,
                password : await bcrypt.hash("123456789", 10) ,
                role : "user",
            },
        });
        console.log('User created:', user);
    }

} catch (error) {
    console.error('Error creating user:', error);
} finally {
    await prisma.$disconnect();
}

}

// Call the function with CLI arguments
myFunction();
