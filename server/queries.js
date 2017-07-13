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
      if (title.length > 0) {
        response.status(200).json(title[0]);
      } else {
        response.status(404).json({error: `No title was found for ${request.params.id}`});
      }
    });
};

const addJob = (request, response) => {
  const job = request.body;

  for (let requiredParams of ['title']) {
    if(!job[requiredParams]) {
      response.status(422).json({
        error: `Expected format: title: <string>. You're missing a ${requiredParams}`});
    }
  }

  database('jobs').insert(job, 'id')
    .then((job) => {
      response.status(201).json({id: job[0]});
    })
    .catch(error => response.status(500).json({error}));
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

const getEmployee = (request, response) => {
  database('employees').where('name', request.params.id).select()
    .then((employee) => {
      if (employee.length > 0) {
        response.status(200).json(employee);
      } else {
        response.status(404).json({error: `No employee was with the name ${request.params.id}`});
      }
    })
    .catch(error => response.status(500).json({error}));
};

const addEmployee = (request, response) => {
  const employee = request.body;
  console.log(employee);

  for(let requiredParams of ['fullname', 'first_name', 'last_name', 'salary', 'job_id', 'name'])
    if(!employee[requiredParams]) {
      return response.status(422).json({error: `Expected format: { fullname: <string>, first_name: <string>, last_name: <string>, salary: <integer>, job_id: <integer>, name: <string>}. You are missing a ${requiredParams} property`});
    }

  database('employees').insert(employee, 'id')
    .then((employee) => {
      response.status(201).json({id: employee[0]});
    })
    .catch(error => response.status(500).json({error}));
};




module.exports = {
  getAllJobs,
  getJob,
  addJob,
  getAllEmployees,
  getEmployee,
  addEmployee
};