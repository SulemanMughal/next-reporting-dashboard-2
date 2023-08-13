

var axios = require("axios").default;
const { 
  v4: uuidv4,
} = require('uuid');


function creat_new_team(team_name){
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/api/team/',
        headers: {
          Accept: '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          'Content-Type': 'application/json'
        },
        data: {name: team_name}
      };
      
      axios.request(options).then(function (response) {
        console.debug(`Team with ${team_name} has been added`)
      }).catch(function (error) {
        console.error(error);
      });
}


// for(var index = 21; index < 30  ; index++){
//     creat_new_team(`Team - ${index}`)   
// }


for (let index = 41 ; index <= 50 ; index++){
  creat_new_team(`Team ${index}`)    
}
