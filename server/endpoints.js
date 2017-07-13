const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.get('/api/v1/jobs/', queries.getAllJobs);
router.get('/api/v1/jobs/:id', queries.getJob);
router.get('/api/v1/employees/', queries.getAllEmployeesByTitle);
router.get('/api/v1/employees/:id', queries.getEmployee);
router.post('/api/v1/employees/', queries.addEmployee);
router.post('/api/v1/jobs/', queries.addJob);
router.patch('/api/v1/employees/:id/salary', queries.updateEmployeeSalary);
router.patch('/api/v1/jobs/:id/title', queries.updateJob);
router.delete('/api/v1/employees/:id/', queries.deleteEmployee);
router.delete('/api/v1/jobs/:id/', queries.deleteJob);

module.exports = router;