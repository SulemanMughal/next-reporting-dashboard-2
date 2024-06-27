const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();



const bcrypt = require('bcrypt');

const args = process.argv.slice(2); // Exclude the first two elements (executable path and script path)

// Check if there are at least two arguments
if (args.length < 2) {
  console.error('Usage: node update_password.js email password');
  process.exit(1);
}

// Extract arguments
const email = args[0];
const password = args[1];

// Your function that uses the arguments
async function  myFunction(email , password) {
  console.log('Argument 1 (email):', email);
  console.log('Argument 2 (password):', password);

  
  try {
    
    // Find user by email and update password
  const updatedUser = await prisma.user.update({
    where: {
      email: email
    },
    data: {
      password : await bcrypt.hash(password, 10) ,
    }
    });
      console.log('User password updated successfully:', updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
  } finally {
      await prisma.$disconnect();
  }

}


myFunction(email,  password);

