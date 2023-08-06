var axios = require("axios").default;

// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

// uuidv4();


function add_new_script(name){
    var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/local_scripts',
    data: {
        name: `${name}`,
        script_id: 'Brute Force',
        desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu'
    }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        console.debug(`Script with ${name} has been added`)
    }).catch(function (error) {
    console.error(error);
    });
}

// const inquirer = require('inquirer');
// const questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "Testing Script Name : ?",
//   },
// ];

// inquirer.prompt(questions).then(answers => {
  
//   add_new_script(answers.name)
//   console.debug(uuidv4())
// });

const id = uuidv4()
add_new_script(id.toString())
