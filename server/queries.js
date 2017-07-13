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
    })
    .catch(err => response.status(500).json({error}));
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

const updateJob = (request, response) => {
  const update = request.body;

  for (let requiredParams of ['title']) {
    if(!update[requiredParams]) {
      response.status(422).json({
        error: `Expected format: title: <string>. You're missing a ${requiredParams}`});
    }
  }

  database('jobs').where('title', request.params.id)
    .update({title: request.body.title})
    .then((res) => {
      if (res === 1) {
        response.status(201).json({success: `${request.params.id} has been updated`});
      } else {
        response.status(204).json({error: `${request.params.id} was not updated`});
      }
    })
    .catch(error => response.status(500).json({error}));
};

const deleteJob = (request, response) => {
  const job = request.body;

  for(let requiredParams of ['title']) 
    if(!job[requiredParams]) {
      return response.status(422).json({error: `Expected format: { title: <string>}. You are missing a ${requiredParams} property`});
    }

  database('jobs').where('title', job.title)
    .delete()
    .then((res) => {
      if (res === 1) {
        response.status(200).json({success: `${request.params.id} was deleted`});
      } else {
        response.status(404).json({error: `${request.params.id} was not found and was not deleted`});
      }
    })
    .catch(error => response.status(500).json({error}));

};

const getAllEmployeesByTitle = (request, response) => {
  database('jobs').where('title', request.query.job).select()
    .then((job) => {
      const id = job[0].id;
      database('employees').where('id', id).select()
      .then((employeeArray) => {
        if (!employeeArray.length < 1) {
          response.status(200).json({employeeArray});
        } else {
          response.status(404).json({error: `No employees were found with the title ${request.query.job}`});
        }
      });
    })
    .catch(error => response.status(404).json({error: `${request.query.job} doesn't exist`}));
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

const updateEmployeeSalary = (request, response) => {
  const update = request.body;

  for(let requiredParams of ['salary']) {
    if(!update[requiredParams]) {
      return response.status(422).json({error: `Expected format: { salary: <integer> }. You are missing a ${requiredParams} property`});
    }
  }

  database('employees').where('name', request.params.id)
    .update({salary: request.body.salary})
    .then((res) => {
      if (res === 1) {
        response.status(201).json({success: `${request.params.id} has been updated`});
      } else {
        response.status(204).json({error: `${request.params.id} was not updated`});
      }
    })
    .catch(error => response.status(500).json({error}));
};

const deleteEmployee = (request, response) => {
  const employee = request.body;

  for(let requiredParams of ['name']) 
    if(!employee[requiredParams]) {
      return response.status(422).json({error: `Expected format: { name: <string>}. You are missing a ${requiredParams} property`});
    }

  database('employees').where('name', employee.name)
    .delete()
    .then((res) => {
      if (res === 1) {
        response.status(200).json({success: `${request.params.id} was deleted`});
      } else {
        response.status(404).json({error: `${request.params.id} was not found and was not deleted`});
      }
    })
    .catch(error => response.status(500).json({error}));

};




module.exports = {
  getAllJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob,
  getAllEmployeesByTitle,
  getEmployee,
  addEmployee,
  updateEmployeeSalary,
  deleteEmployee
};