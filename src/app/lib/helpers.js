
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