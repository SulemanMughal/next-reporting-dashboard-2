// const fs = require('fs')


// convert to uppercase first letter of each word   
export function convertStringToTitleCase(string){
    if(string){
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    } else {
        return ""
    }
}



export function convertStringToArray(string){
    if(string){
        return string.split(",").map(item => item.trim())
    } else {
        return []
    }
}


export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export function reverseArray(array){
    let newArray = []
    array.map((item) => {
        newArray.unshift(item)
    })
    return newArray
}


export function quizStatus(startAt, endAt){
    const current_time = new Date()
    const end_time = new Date(endAt)
    const start_time = new Date(startAt)
    if( current_time < start_time) { 
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-blue-600 mr-2 mb-2">{"Upcoming"}</span>
        )
    }  else if ((current_time.getTime() < end_time.getTime()) && (start_time.getTime() < end_time.getTime())){
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-indigo-600 mr-2 mb-2">{"In Progress"}</span>
        )
    } else if (end_time <  current_time){
        return (
            <span className="inline-block  rounded-full px-3 py-1 text-lg font-semibold bg-none text-violet-600 mr-2 mb-2">{"End"}</span>
        )
    }
}



export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}





// calculate total poitns for a quiz
export function calcTotalPoints(quiz){
    let points = 0
    if(quiz  && quiz.questions && quiz.questions.length){
        quiz.questions.map((question) => {
            points = points + question.points
        })
    }
    return points
}



// convert an array to a string with comma separated values
export function arrayToString(array){
    let string = ""
    array.map((item, index) => {
        if(index === array.length - 1){
            string += item
        } else {
            string += item + ","
        }
    })
    return string
}


// different colors for different level of difficulty
export function getDifficultyColor(difficulty){
    // console.debug(difficulty)
    if(difficulty === "Easy"){
        return "px-1 py-1 text-md font-semibold bg-none text-green-400"
    } else if(difficulty === "Medium"){
        return " px-1 py-1 text-md font-semibold bg-none text-orange-400"
    } else if(difficulty === "Hard"){
        return " px-1 py-1 text-md font-semibold bg-none text-red-400"
    } else {
        return " px-1 py-1 text-md font-semibold bg-none text-gray-400"
    }
}




// calculate total poitns for a challenge
export function calcTotalPointsScenario(scenario){
    let points = 0
    if(scenario  && scenario.questions && scenario.questions.length){
        scenario.questions.map((question) => {
            points = points + question.points
        })
    }
    return points
}



// calculate total obtained by a team
export function calcTeamObtainedPoints(answers){    
    let points = 0
    try {
        for(let index = 0 ; index < answers.length ; index++){
            points = points + answers[index].obtainedPoints
        }
        return points
    } catch (error) {
        console.debug(error)
        return points
    }
}



// calculate filesize in kb, mb, gb
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    // console.debug(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i])
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}




// const ufs = require("url-file-size");

// calculate filezize from a given filepath
// export function getFileSize(filepath){
//     // console.debug(filepath)
//     try {
//         const stats = fs.statSync(filepath)
//         const fileSizeInBytes = stats.size
//         return formatBytes(fileSizeInBytes)
//         // ufs("https://dimden.dev/logo.png")
//         // .then(console.log) // 1416
//         // .catch(console.error);
//         // return 
//     } catch (error) {
//         console.debug(error)
//         return "0 Bytes"
//     }
// }