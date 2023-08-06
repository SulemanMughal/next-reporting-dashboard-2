

var axios = require("axios").default;


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
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
}





const inquirer = require('inquirer');
const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Team name : ?",
  },
];

inquirer.prompt(questions).then(answers => {
  
    creat_new_team(answers.name)
});