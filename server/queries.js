const database = require('../db/knex');

const getAllJobs = (request, response) => {
  database('jobs').select()
  .then((jobsArray) => {
    if (jobsArray.length) {
      response.status(200).json(jobsArray);
    } else {
      response.status(404).json({error: 'No jobs were found'});
    }
  })
  .catch(error => response.status(500).json({ error}));
};

const getAllEmployees = (request, response) => {
  database('employees').select()
    .then((emploeesArray) => {
      if(emploeesArray.length) {
        response.status(200).json(emploeesArray);
      } else {
        response.status(404).json({error: 'No employees were found'});
      }
    })
    .catch(error => response.status(500).json({error}));
};


module.exports = {
  getAllJobs,
  getAllEmployees
};