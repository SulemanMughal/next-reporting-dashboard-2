var axios = require("axios").default;

// var options = {
//   method: 'PUT',
//   url: 'http://localhost:3000/api/quiz/update/status/1',
//   headers: {
//     Accept: '*/*',
//     'Content-Type': 'application/json'
//   },
//   data: {
//     title: 'Question 6',
//     option_1: 'A',
//     option_2: 'B',
//     option_3: 'C',
//     option_4: 'D',
//     option_5: 'E',
//     option_6: 'F',
//     original_answer: 'F',
//     points: 50,
//     Description: '',
//     status: 'publish',
//     question_index: 6
//   }
// };
for(var index = 1; index < 15; index++){
    let options = {
        method: 'PUT',
        url: 'http://localhost:3000/api/quiz/1/question/create',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        data: {
          title: `Question ${index}`,
          option_1: 'A',
          option_2: 'B',
          option_3: 'C',
          option_4: 'D',
          option_5: 'E',
          option_6: 'F',
          original_answer: 'F',
          points: 50,
          Description: '',
          status: 'publish',
          question_index: index
        }
    };
    // console.debug(options)
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
    console.error(error);
    });
    // setTimeout(function() {
    //     //your code to be executed after 1 second
    // }, 10000);
}
