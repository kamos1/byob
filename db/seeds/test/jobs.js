const jobs = require('../../../seedJobs');
const employees = require('../../../seedEmployees');

const createJob = (knex, job) => {
  return knex('jobs').insert({
    title: job.title
  }, 'id')
  .then(jobId => {

    let employeesPromises = [];

    employees.forEach(employee => {

      if (employee.position_title === job.title ) {
        employeesPromises.push(
          createEmployee(knex, {
            fullname: employee.full_name,
            first_name: employee.first_name,
            last_name: employee.last_name,
            salary: employee.salary,
            job_id: jobId[0],
            name: employee.name,
          })
        );
      }
    });
    return Promise.all(employeesPromises);
  });
};

const createEmployee = (knex, employee) => {
  return knex('employees').insert(employee);
};


exports.seed = function(knex, Promise) {
 return knex('employees').del()
    .then(() => knex('jobs').del())
    .then(() => {
      let jobPromises = [];

      jobs.forEach(job => {
        jobPromises.push(createJob(knex, job));
      });
      return Promise.all(jobPromises);
    })
    .catch(error =>  console.log(`seeding failed: ${error}`));
};
