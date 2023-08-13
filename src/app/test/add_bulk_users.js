var axios = require("axios").default;
const { 
  v4: uuidv4,
} = require('uuid');


function add_bulk_users(index){
    var axios = require("axios").default;

    var options = {
        method: 'POST',
        url: 'http://localhost:3000/api/user/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            name: `user_${index}`, 
            email: `user_${index}@gmail.com`, 
            password: '123456789'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}




for (let index = 81 ; index <= 100 ; index++){
    add_bulk_users(index)    
}
