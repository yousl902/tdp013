import superagent from 'superagent';
const baseUrl = "http://localhost:3000";


// callback
superagent
  .post('http://localhost:3000/api/pet')
  .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
    // Calling the end function will send the request
  });
