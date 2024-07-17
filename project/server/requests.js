import superagent from 'superagent';

const baseUrl = "http://localhost:5080";

// callback
// superagent
//   .post(`${baseUrl}/api/users/signup`)
//   .send({ username: 'Manny', name: 'Manny', password: 'cat' }) // sends a JSON post body
//   .end((err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res.text);
//     }
//   });

superagent
  .post(`${baseUrl}/api/users/login`)
  .send({ username: 'Manny', password: 'cat' }) // sends a JSON post body
  .end((err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.text);
    }
  });
