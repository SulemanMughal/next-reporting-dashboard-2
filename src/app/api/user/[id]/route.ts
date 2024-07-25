import prisma from "@/app/lib/prisma";
import encrypt from "@/app/lib/encrypt"


export async function GET(request: Request, {params} : {params : {id : string}}){
    try {
        const team_id = await prisma.user.findFirst({
            where : {
                id  : params.id
            }, select : {
                teamId : true,
            }
        })
        if(team_id.teamId === null){
            const encryptedData = encrypt({status : false, error : "Sorry! You're not part of any team. Please contact admin."})
            return new Response(JSON.stringify({ encryptedData }))

        } else {
            const quiz_id = await prisma.team.findFirst({
                where : {
                    id : team_id?.teamId    
                }, select : {   
                    quizId : true,
                    name : true
                }
            })
            const user = await prisma.user.findUnique({
                where : {
                    id : params.id
                },
                select : {
                    id : true,
                    name : true,
                    email : true,
                    team : {
                        select : {
                            id : true,
                            name : true,
                            quiz : {
                                select : {
                                    questions : {
                                        select : {
                                            scenario : {
                                                select  :{
                                                    id : true,
                                                    name : true,
                                                    status : true,
                                                    category : true,
                                                    desc : true,
                                                    difficulty : true,
                                                    questions : {
                                                        where : {
                                                            quizId : (quiz_id?.quizId !== undefined) ? quiz_id?.quizId : null
                                                        }, select : {
                                                            id : true,
                                                            points: true,
                                                        }
                                                    }
                                                }
                                            },
                                            answers : {
                                                where : {
                                                    teamId : (team_id?.teamId !== undefined) ? team_id?.teamId : null
                                                }, select : {
                                                    id : true,
                                                    submissionStatus : true,
                                                    obtainedPoints : true,
                                                    user : {
                                                        select : {
                                                            id : true,
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            
            const total_teams = await prisma.team.count({})
            const teamRecords:any = await prisma.$queryRaw`SELECT t.id AS team_id, t.name AS team_name, SUM(a.obtainedPoints) AS total_obtained_points FROM "Team" AS t LEFT JOIN "Answer" AS a ON t.id = a.teamId WHERE a.submissionStatus = true GROUP BY t.id, t.name ORDER BY total_obtained_points DESC;`
            const teamBonusPoints:any = await prisma.$queryRaw`SELECT first_blood_points FROM Scenario WHERE first_blood = ${quiz_id?.name}`


            const userPoints:any = await prisma.$queryRaw`SELECT SUM(obtainedPoints) AS total_obtained_points FROM Answer WHERE submissionStatus = true AND userId = ${params.id};`

            const total_obtained_points = parseInt(userPoints[0]?.total_obtained_points) || 0;

            const totalBonusPoints = teamBonusPoints.reduce((sum: number, record: any) => sum + record.first_blood_points, 0);

            // const ChallengesCompleted = await prisma.$queryRaw`WITH TeamAnswers AS ( SELECT s.id AS scenario_id, q.id AS question_id, a.teamId, a.submissionStatus FROM Scenario s JOIN Question q ON s.id = q.scenarioId LEFT JOIN Answer a ON q.id = a.questionId AND a.teamId = ${team_id?.teamId} ), AnsweredQuestions AS ( SELECT scenario_id, question_id, COUNT(*) FILTER (WHERE submissionStatus = true) AS successful_answers, COUNT(*) AS total_answers FROM TeamAnswers GROUP BY scenario_id, question_id ), ScenarioCompletion AS ( SELECT scenario_id, COUNT(*) FILTER (WHERE successful_answers = 1) AS successfully_answered_questions, COUNT(*) AS total_questions FROM AnsweredQuestions GROUP BY scenario_id ) SELECT COUNT(*) AS total_successful_scenarios FROM ScenarioCompletion WHERE successfully_answered_questions = total_questions;`

            const ChallengesCompleted : any = await prisma.$queryRaw`SELECT
            COUNT(*) AS solved_challenges_count
        FROM
            Scenario s
        JOIN
            Question q ON s.id = q.scenarioId
        LEFT JOIN
            Answer a ON q.id = a.questionId AND a.teamId = '0554d7c4-c7a1-414b-a9c9-ef3ad56b11a1' 
            AND a.submissionStatus = true 
            AND (s.is_patch = false OR (s.is_patch = true AND a.checkStatus = false))
        GROUP BY
            s.id
        HAVING
            COUNT(q.id) = COUNT(a.id);`

            // console.debug(ChallengesCompleted?.length)
            
            
            // const total_successful_scenarios = parseInt(ChallengesCompleted[0]?.total_successful_scenarios) || 0;
            const total_successful_scenarios = parseInt(ChallengesCompleted?.length) || 0;
            
            
            const team_position = teamRecords.findIndex(record => record.team_id === team_id.teamId);


            const teamStatistics:any = await prisma.$queryRaw`SELECT 
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            COALESCE(SUM(a.obtainedPoints), 0) AS total_obtained_points
        FROM 
            "User" u
        LEFT JOIN 
            "Answer" a ON u.id = a.userId AND a.submissionStatus = true
        WHERE 
            u.teamId = ${team_id.teamId}
        GROUP BY 
            u.id, u.name, u.email
        ORDER BY 
            total_obtained_points DESC;`

        const first_blood_challenges = await prisma.$queryRaw`SELECT 
        COUNT(*) AS total_first_blood_scenarios
    FROM 
        Scenario s
    WHERE 
        s.first_blood = ${quiz_id?.name}`;


            const total_first_blood_scenarios = parseInt(first_blood_challenges[0]?.total_first_blood_scenarios) || 0;
            const teamStatisticsJson = teamStatistics?.map(user => ({
                ...user,
                total_obtained_points: user.total_obtained_points.toString()
            }));

            let jsonResults:any = [];
            try{
                
            
            const CompletedChallengesNames:any = await prisma.$queryRaw`SELECT
            s.id AS scenario_id,
            s.name AS scenario_name,
            COALESCE(SUM(a.obtainedPoints), 0) AS total_obtained_points,
            SUM(q.points) AS total_original_points,
            'solved' AS status,
            s.category AS category,
            s.difficulty AS difficulty,
            s.desc AS scenario_desc
        FROM
            Scenario s
        JOIN
            Question q ON s.id = q.scenarioId
        LEFT JOIN
            Answer a ON q.id = a.questionId AND a.teamId = ${team_id.teamId} 
            AND a.submissionStatus = true 
            AND (s.is_patch = false OR (s.is_patch = true AND a.checkStatus = false))
        GROUP BY
            s.id, s.name
        HAVING
            COUNT(q.id) = COUNT(a.id)
        
        UNION ALL
        
        SELECT
            s.id AS scenario_id,
            s.name AS scenario_name,
            0 AS total_obtained_points,
            SUM(q.points) AS total_original_points,
            'unsolved' AS status,
            s.category AS category,
            s.difficulty AS difficulty,
            s.desc AS scenario_desc
        FROM
            Scenario s
        JOIN
            Question q ON s.id = q.scenarioId
        LEFT JOIN
            Answer a ON q.id = a.questionId AND a.teamId = ${team_id.teamId} 
            AND a.submissionStatus = true 
            AND (s.is_patch = false OR (s.is_patch = true AND a.checkStatus = false))
        GROUP BY
            s.id, s.name
        HAVING
            COUNT(q.id) <> COUNT(a.id);`
            const convertBigIntProperties = (obj) => {
                return {
                ...obj,
                total_obtained_points: Number(obj.total_obtained_points),
                total_original_points: Number(obj.total_original_points),
                };
            };
            jsonResults = CompletedChallengesNames?.map(convertBigIntProperties);
            } catch(error){
                jsonResults=[]
                console.debug(error)
            }


            const encryptedData = encrypt({status : true, user , total_teams: total_teams , team_position : (team_position+1) , totalBonusPoints:totalBonusPoints, userObtainedPoints : total_obtained_points, 
                teamStatisticsJson : teamStatisticsJson, total_successful_scenarios:total_successful_scenarios,
                team_name : quiz_id?.name || "",
                total_first_blood_scenarios : total_first_blood_scenarios,
                jsonResults : jsonResults
            
            })

            

            return new Response(JSON.stringify({ encryptedData }))
        }
        
    } catch (error) {
        console.debug(error)
        const encryptedData = encrypt({status : false, error : "Sorry! There is an error while fetching user data.Please try again later"})
        return new Response(JSON.stringify({ encryptedData }))
    }
}