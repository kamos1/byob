# Project Name: BYOD
 -	*Create a backend with Express and Knex with a Postgresql database. The data for this backend is the White House Staff salary and job information.*


## Endpoints
### get - /api/v1/jobs
- This endpoint returns all job titles.
	- id
	- title 

### get - /api/v1/jobs/:id
- This endpoint returns a specific job title.
	- id
	- title	 

### get - /api/v1/employees/?title=STENOGRAPHER
- This endpoint returns all employees by the provided job title.
	- id
	- fullname
	- first name
	- last name
	- name
		 

### get - /api/v1/employees/:id
- This endpoint returns a specific employee based on the provided employee name.
	- fullname
	- first name
	- last name
	- name


### post - /api/v1/employees/
- This endpoint allows the user to add an employee. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns employee id
- Required parameters: 
	- 'fullname', 
	- 'first_name', 
	- 'last_name', 
	- salary, 
	- job_id, 
	- 'name'
	 
### post - /api/v1/jobs/
- This endoint allows the user to add a job. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns job id
- Required parameters:
	- title 
	
### post - /authenticate'
- Use this endpoint to get a token that can be used with the POST, PATCH, and DELETE endpoints.


### patch - /api/v1/employees/:id/salary 
- This endpoint allows the user to update an employee's salary. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns success or failure message
- Required parameters:
	- salary
	- token
	 
### patch - /api/v1/jobs/:id/title
- This endpoint updates a job title. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns success message
- Required parameter:
	- title 
	- token
	
### delete - /api/v1/employees/:id/
- Remove an employee. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns success or failure message

### delete -'/api/v1/jobs/:id/
- Remove a job. A token is required to make this request. Use the ```/authenticate``` endpoint to get a token.
- Returns success or failure message
