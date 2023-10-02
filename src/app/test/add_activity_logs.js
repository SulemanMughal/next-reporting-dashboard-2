const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function login_logs({ action_by , message, level = "medium" }){
        const results = await prisma.logEntry.create({
            data : {
                action_name : "UserLogon",
                action_by : action_by,
                message : message,
                level : level
            }
        })
}


async function logout_logs({ action_by , message, level = "Normal" }){
    const results = await prisma.logEntry.create({
        data : {
            action_name : "UserLogoff",
            action_by : action_by,
            message : message,
            level : level
        }
    })
}


async function admin_loggin_logs({ action_by , message ,  level = "High" }){
    const results = await prisma.logEntry.create({
        data : {
            action_name : "UserLogon",
            action_by : action_by,
            message : message,
            level : level
        }
    })
}


async function registration_logs({ action_by , message, level = "Normal" }){
    const results = await prisma.logEntry.create({
        data : {
            action_name : "UserLogon",
            action_by : action_by,
            message : message,
            level : level
        }
    })
}


async function new_activity_logs(){
    const all_users = await prisma.user.findMany({})

    for(let user_index = 0 ; user_index < all_users.length ; user_index++){


        // -------------
        // Logged-In Activity Logs
        
        login_logs({ action_by : all_users[user_index].name, message : `Acccount ${all_users[user_index].name} has been logged-in.` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // ------------


        // ------------
        // Logged-Out Activity Logs
        
        // logout_logs({ action_by : all_users[user_index].name, message : `Acccount ${all_users[user_index].name} has been logged-out.` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // ------------


        // ------------
        // Admin Account Login Activity Logs

        // if(all_users[user_index].role === "admin"){
        //     admin_loggin_logs({ action_by : all_users[user_index].name, message : `Administrator Account has been logged-in with ${all_users[user_index].name}.` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // } else {
        //     admin_loggin_logs({ action_by : all_users[user_index].name, message : `${all_users[user_index].name} has tried to access Administrator Account.` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // }
        
        // ------------


        // ------------
        // Registration Activity Logs
        
        // registration_logs({ action_by : all_users[user_index].name, message : `A new account ${all_users[user_index].name} has been registered` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // ------------

        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

new_activity_logs()
