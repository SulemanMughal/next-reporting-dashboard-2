const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function add_new_member({user_id, team_id}){
    await prisma.team.update({
        where : {
            id : team_id
        },
        data : {
            users : {
                connect : {
                    id : user_id
                }
            }
        }
    }).then(res => {
        return true
    }).catch(error => {
        console.debug(error)
        return false
    })
}

async function remove_member_from_team({user_id, team_id}){
    await prisma.team.update({
        where : {
            id : team_id
        },
        data : {
            users : {
                disconnect : {
                    id : user_id
                }
            }
        }
    }).then(res => {
        return true
    }).catch(error => {
        return false
    })
}


async function answer_submission({user_id, team_id, question_id, answer}){
    await prisma.answer.create({
        data : {
            // questionId : question_id,
            // userId : user_id,
            // teamId: team_id,
            submitAnswer : answer,
            obtainedPoints : 50,
            submissionStatus : true,
            question : {
                connect : {
                    id : question_id
                }
            },
            user : {
                connect : {
                    id : user_id
                }
            },
            team : {
                connect : {
                    id : team_id
                }
            }
        }
    }).then(res => {
         new Promise(resolve => setTimeout(resolve, 500));
    }).catch(error => {console.debug(error)})

}


async function new_member_logs({ action_by , message ,  level = "High" }){
    const results = await prisma.logEntry.create({
        data : {
            action_name : "TeamMemberAdd",
            action_by : action_by,
            message : message,
            level : level
        }
    })
}


async function submission_logs({ action_by , message ,  level = "Normal" }){
    const results = await prisma.logEntry.create({
        data : {
            action_name : "ChallengeSubmission",
            action_by : action_by,
            message : message,
            level : level
        }
    })
}

async function submit_answers(){
    try {
        const all_users = await prisma.user.findMany({})
        let all_teams = await prisma.team.findMany({
            select:{
                id : true,
                name : true,
                users : true
            }
        })

        // =========================================================================================
        // Add members to teams
        // for(let user_index = 0 ; user_index < all_users.length ; user_index++){
        //     if(all_users[user_index].teamId === null || all_users[user_index].role !== "admin"){
        //         let all_teams = await prisma.team.findMany({
        //             select:{
        //                 id : true,
        //                 name : true,
        //                 users : true
        //             }
        //         })
        //     for(let team_index = 0 ; team_index < all_teams.length ; team_index++){
        //         if((all_teams[team_index].users.length >= 0 &&  all_teams[team_index].users.length <= 2 && all_users[user_index].teamId === null)){
                    
        //             add_new_member({user_id : all_users[user_index].id, team_id : all_teams[team_index].id}).then((res) => {console.debug(`Added : ${all_users[user_index].id} - ${all_teams[team_index].id}`)}).catch(error => {console.debug(error)})
        //             await new Promise(resolve => setTimeout(resolve, 100));
        //             // new_member_logs({ action_by : all_users[user_index].name, message : `Account ${all_users[user_index].name} became member of Team : ${all_teams[team_index].name}` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        //             // await new Promise(resolve => setTimeout(resolve, 100));
        //             break
        //         } 
        //     }
        //     }
        // }
        // =========================================================================================


        // =========================================================================================
        // Remove members to teams (uncomment below code to use)
        // all_users.map((item, index) => {  
        //     for(let team_index = 0 ; team_index < all_teams.length ; team_index++){
        //         remove_member_from_team({user_id : item.id, team_id : item.teamId}).then((res) => {console.debug(`Removed : ${item.id} - ${item.teamId}`)}).catch(error => {console.debug(error)})
        //     }
        // })
        // =========================================================================================


        // =========================================================================================
        // Create a submission by a member of a team
        all_users.map((item, index) => {  
            answer_submission({user_id : item.id, team_id : item.teamId , question_id : "3fbda051-b8f6-45e4-b0d4-8c35839190ab", answer : "gamma"}).then((res) => { console.debug(`Submitted : ${item.name} `)}).catch(error => {console.debug(error)})
                // await new Promise(resolve => setTimeout(resolve, 150));
                // submission_logs({ action_by : item.id, message : `Account ${item.name} (Team-ID : ${item.teamId}) Successfully Submit Answer to Question-ID : "3fbda051-b8f6-45e4-b0d4-8c35839190ab"` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        })

        // await new Promise(resolve => setTimeout(resolve, 150));
        // submission_logs({ action_by : all_users[user_index].name, message : `Account ${all_users[user_index].name} (Team-ID : ${all_users[user_index].teamId}) Successfully Submit Answer to Question-ID : "3fbda051-b8f6-45e4-b0d4-8c35839190ab"` }).then((res) => {console.debug(`Added`)}).catch(error => {console.debug(error)})
        // await new Promise(resolve => setTimeout(resolve, 150));
        
        // =========================================================================================
        
    } catch (error) {
        console.error(error)
    }
    
}

submit_answers()