# Project Name: BYOD
 -	*Create a backend with Express and Knex with a Postgresql database. The data for this backend is the White House Staff salary and job information.*


## Endpoints
### get - /api/v1/jobs
- Returns all job titles

### get - /api/v1/jobs/:id
- Returns a specific job title

### get - /api/v1/employees/
- Returns all employees
	- fullname
	- first name
	- last name
	- name
		 

### get - /api/v1/employees/:id
- Returns a specific employee
	- fullname
	- first name
	- last name
	- name


### post - /api/v1/employees/
- Add an employee. A token is required to make this request.
- Returns employee id
- Required parameters: 
	- 'fullname', 
	- 'first_name', 
	- 'last_name', 
	- 'salary', 
	- 'job_id', 
	- 'name'
	 
### post - /api/v1/jobs/
- Add a job. A token is required to make this request.
- Returns job id
- Required parameters:
	- title 
	
### post - /authenticate'
- Returns a json web token


### patch - /api/v1/employees/:id/salary 
- Updates an employee's salary. A token is required to make this request.
- Returns success or failure message
- Required parameters:
	- salary
	- token
	 
### patch - /api/v1/jobs/:id/title
- Updates a job title. A token is required to make this request.
- Returns success message
- Required parameter:
	- title 
	
### delete - /api/v1/employees/:id/
- Remove an employee. A token is required to make this request.
- Returns success or failure message

### delete -'/api/v1/jobs/:id/
- Remove a job. A token is required to make this request.
- Returns success or failure message
