const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('dotenv').config().parsed;

const routes = require('./endpoints');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('it worked');
});

app.use('/', routes);

if (!process.env.CLIENT_SECRET || !process.env.USERNAME || !process.env.PASSWORD) {
  throw 'Make sure you have a CLIENT_SECRET, USERNAME, and PASSWORD in your .env file';
}

app.set('secretKey', config.CLIENT_SECRET);

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}.`);
});

module.exports = app;
