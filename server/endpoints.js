const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/api/v1/jobs/', queries.getAllJobs);
router.get('/api/v1/jobs/:id', queries.getJob);
router.get('/api/v1/employees/', queries.getAllEmployees);
router.get('/api/v1/employees/:id', queries.getEmployee);

module.exports = router;