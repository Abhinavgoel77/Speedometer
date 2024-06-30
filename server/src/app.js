const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();


// Sync the database
sequelize.sync()
  .then(() => console.log('Database connected and synced'))
  .catch(err => console.log('Error: ' + err));

module.exports = app;
