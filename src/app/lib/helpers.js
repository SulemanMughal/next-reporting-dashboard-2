const fs = require("fs");
var path = require('path');



// export const  countries = [
//     "Afghanistan", 
//     "Albania", 
//     "Algeria", 
//     "American Samoa", 
//     "Andorra", "Angola", 
//     "Anguilla", 
//     "Antarctica", 
//     "Antigua and/or Barbuda",
//     "Argentina",
//     "Armenia",
//     "Aruba",
//     "Australia",
//     "Austria",
//     "Azerbaijan",
//     "Bahamas",
//     "Bahrain",
//     "Bangladesh",
//     "Barbados",
//     "Belarus",
//     "Belgium",
//     "Belize",
//     "Benin",
//     "Bermuda",
//     "Bhutan",
//     "Bolivia",
//     "Bosnia and Herzegovina",
//     "Botswana",
//     "Bouvet Island",
//     "Brazil",
//     "British lndian Ocean Territory",
//     "Brunei Darussalam",
//     "Bulgaria",
//     "Burkina Faso",
//     "Burundi",
//     "Cambodia",
//     "Cameroon",
//     "Canada",
//     "Cape Verde",
//     "Cayman Islands",
//     "Central African Republic",
//     "Chad",
//     "Chile",
//     "China",
//     "Christmas Island",
//     "Cocos (Keeling) Islands",
//     "Colombia",
//     "Comoros",
//     "Congo",
//     "Cook Islands",
//     "Costa Rica",
//     "Croatia (Hrvatska)",
//     "Cuba",
//     "Cyprus",
//     "Czech Republic",
//     "Democratic Republic of Congo",
//     "Denmark",
//     "Djibouti",
//     "Dominica",
//     "Dominican Republic",
//     "East Timor",
//     "Ecuador",
//     "Egypt",
//     "El Salvador",
//     "Equatorial Guinea",
//     "Eritrea",
//     "Estonia",
//     "Ethiopia",
//     "Falkland Islands (Malvinas)",
//     "Faroe Islands",
//     "Fiji",
//     "Finland",
//      "France",
//      "Metropolitan",
//      "French Guiana",
//      "French Polynesia",
//      "French Southern Territories",
//      "Gabon",
//      "Gambia",
//      "Georgia",
//      "Germany",
//      "Ghana",
//      "Gibraltar",
//      "Greece",
//      "Greenland",
//      "Grenada",
//      "Guadeloupe",
//      "Guam",
//      "Guatemala",
//      "Guinea",
//      "Guinea-Bissau",
//      "Guyana",
//      "Haiti",
//      "Heard and Mc Donald Islands",
//      "Honduras",
//      "Hong Kong",
//      "Hungary",
//      "Iceland",
//      "India",
//      "Indonesia",
//      "Iran (Islamic Republic of)",
//      "Iraq",
//      "Ireland",
//      "Israel",
//      "Italy",
//      "Ivory Coast",
//      "Jamaica",
//      "Japan",
//      "Jordan",
//      "Kazakhstan",
//      "Kenya",
//      "Kiribati",
//      "Korea",
//      "Democratic People's Republic of Korea",
//      "Republic of Kosovo",
//      "Kosovo",
//      "Kuwait",
//      "Kyrgyzstan",
//      "Lao People's Democratic Republic",
//      "Latvia",
//      "Lebanon",
//      "Lesotho",
//      "Liberia",
//      "Libyan Arab Jamahiriya",
//      "Liechtenstein",
//      "Lithuania",
//      "Luxembourg",
//      "Macau",
//      "Macedonia",
//      "Madagascar",
//      "Malawi",
//      "Malaysia",
//      "Maldives",
//      "Mali",
//      "Malta",
//      "Marshall Islands",
//      "Martinique",
//      "Mauritania",
//      "Mauritius",
//      "Mayotte",
//      "Mexico",
//      "Micronesia",
//      "Federated States of Moldova",
//      "Republic of Monaco",
//      "Mongolia",
//      "Montserrat",
//      "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of South Sudan", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"

// ]



export const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brazil", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo (Brazzaville)", code: "CG" },
    { name: "Congo (Kinshasa)", code: "CD" },
    { name: "Costa Rica", code: "CR" },
    { name: "Côte d'Ivoire", code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Greece", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, North", code: "KP" },
    { name: "Korea, South", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Laos", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestine", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Qatar", code: "QA" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syria", code: "SY" },
    { name: "Taiwan", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Vatican City", code: "VA" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];
  




// Links
const webLinks = {
    "user_challenges": "/user/challenges",
}


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
    return name.toUpperCase().charAt(0) + name.toUpperCase().charAt(1);
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

