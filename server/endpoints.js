const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/api/v1/jobs/', queries.getAllJobs);
router.get('/api/v1/employees/', queries.getAllEmployees);

module.exports = router;