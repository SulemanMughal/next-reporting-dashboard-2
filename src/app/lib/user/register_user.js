const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();


const bcrypt = require('bcrypt');


const args = process.argv.slice(2); // Exclude the first four elements (executable path and script path)

// Check if there are at least four arguments
if (args.length < 4) {
  console.error('Usage: node register_user.js email username password role');
  process.exit(1);
}

// Extract arguments
const email = args[0];
const username = args[1];
const password = args[2];
const role = args[3];

// Your function that uses the arguments
async function myFunction(email, username , password, role) {
  console.log('Argument 1 (email):', email);
  console.log('Argument 2 (username):', username);
  console.log('Argument 3 (password):', password);
  console.log('Argument 3 (role):', role);

  try {
    
    const user = await prisma.user.create({
        data: {
            email: email,
            name : username,
            password : await bcrypt.hash(password, 10) ,
            role : role,
        },
    });
    console.log('User created:', user);
} catch (error) {
    console.error('Error creating user:', error);
} finally {
    await prisma.$disconnect();
}

}

// Call the function with CLI arguments
myFunction(email, username, password, role);
