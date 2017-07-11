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

const getJob = (request, response) => {
  database('jobs').where('title', request.params.id).select()
    .then((title) => {  
    console.log(title.length) 
      if (title.length > 0) {
        response.status(200).json(title[0]);
      } else {
        response.status(404).json({error: `No title was found for ${request.params.id}`});
      }
    });
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
  getJob,
  getAllEmployees
};