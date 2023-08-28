const fs = require("fs");
var path = require('path');



export const  countries = [
    "Afghanistan", 
    "Albania", 
    "Algeria", 
    "American Samoa", 
    "Andorra", "Angola", 
    "Anguilla", 
    "Antarctica", 
    "Antigua and/or Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British lndian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Croatia (Hrvatska)",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
     "France",
     "Metropolitan",
     "French Guiana",
     "French Polynesia",
     "French Southern Territories",
     "Gabon",
     "Gambia",
     "Georgia",
     "Germany",
     "Ghana",
     "Gibraltar",
     "Greece",
     "Greenland",
     "Grenada",
     "Guadeloupe",
     "Guam",
     "Guatemala",
     "Guinea",
     "Guinea-Bissau",
     "Guyana",
     "Haiti",
     "Heard and Mc Donald Islands",
     "Honduras",
     "Hong Kong",
     "Hungary",
     "Iceland",
     "India",
     "Indonesia",
     "Iran (Islamic Republic of)",
     "Iraq",
     "Ireland",
     "Israel",
     "Italy",
     "Ivory Coast",
     "Jamaica",
     "Japan",
     "Jordan",
     "Kazakhstan",
     "Kenya",
     "Kiribati",
     "Korea",
     "Democratic People's Republic of Korea",
     "Republic of Kosovo",
     "Kosovo",
     "Kuwait",
     "Kyrgyzstan",
     "Lao People's Democratic Republic",
     "Latvia",
     "Lebanon",
     "Lesotho",
     "Liberia",
     "Libyan Arab Jamahiriya",
     "Liechtenstein",
     "Lithuania",
     "Luxembourg",
     "Macau",
     "Macedonia",
     "Madagascar",
     "Malawi",
     "Malaysia",
     "Maldives",
     "Mali",
     "Malta",
     "Marshall Islands",
     "Martinique",
     "Mauritania",
     "Mauritius",
     "Mayotte",
     "Mexico",
     "Micronesia",
     "Federated States of Moldova",
     "Republic of Monaco",
     "Mongolia",
     "Montserrat",
     "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of South Sudan", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"

]


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
        return " py-1 text-base font-bold bg-none text-green-600"
    } else if(difficulty === "Medium"){
        return "  py-1 text-base font-bold bg-none text-hot-cinnamon"
    } else if(difficulty === "Hard"){
        return "  py-1 text-base font-bold bg-none text-valencia-red"
    } else {
        return "  py-1 text-base font-bold bg-none text-gray-400"
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





// calculate filsize at a given path
export function calcFileSize(filepath){
    const file = path.resolve(process.env.BASE_PATH + filepath);
    try {
        const stats = fs.statSync(file)
        return formatBytes(stats.size)
    } catch (error) {
        console.debug(error)
        return "0 Bytes"
    }
}




// Get and Captialize Initials (first two letters of name)
export function getInitials(name) {
    return name.toUpperCase().charAt(0) + name.toUpperCase().charAt(0);
}




// // convert to uppercase first letter of each word   
// function convertStringToTitleCase(string){
//     return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }


// calculate total points for a scenario by summing up points of all questions
export function totalScenarioPoints(scenario){
    let sum = 0
    if(scenario && scenario.questions && scenario.questions.length){
        scenario.questions.forEach((question) => {
            sum = sum + question.points
        })
    }
    return sum
}


// extract answer format from question description
export function extractLastStrategyName(inputString) {
    try {
        const matches = inputString.match(/Format: ([^\)]*)/g);
        if (matches && matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            return lastMatch.replace("Format: ", "");
        } else {
            return "* * * * * * "; // No match found
        }
    } catch (error) {
        return "* * * * * * "; // in case of error

    }
}



// calc total scenarios for a quiz
export function calcTotalScenarios(quiz){
    let new_array = []
    try {
        if(quiz?.questions){
            quiz?.questions.forEach(element => {
                if(element?.scenario){
                    if(!new_array.includes(element?.scenario?.name)){
                        new_array.push(element?.scenario?.name)
                    }
                }
            });    
        }
        return new_array.length 
    } catch (error) {
        console.debug(error)
        return 0
    }
}