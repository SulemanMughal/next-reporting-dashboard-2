var axios = require("axios").default;
const { 
  v4: uuidv4,
} = require('uuid');


function add_bulk_attacking_scripts(name){
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
        console.debug(`Script with ${name} has been added`)
    }).catch(function (error) {
    console.error(error);
    });
}




for (let index = 1 ; index < 10 ; index++){
    add_bulk_attacking_scripts(uuidv4().toString())    
}
