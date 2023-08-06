var axios = require("axios").default;

const { 
  v4: uuidv4,
} = require('uuid');



function create_bulk_quiz(title){
    var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/quiz/create',
    data: {
        title: `${title}`,
        startAt:  new Date(),
        endAt: new Date()
    }
    };
    axios.request(options).then(function (response) {
        console.debug(`Quiz with ${title} has been created`)
    }).catch(function (error) {
    console.error(error);
    });
}



for (let index = 1 ; index < 20 ; index++){
    create_bulk_quiz(uuidv4().toString())    
}
