const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('secretKey', process.env.SECRET_KEY_JWT);

require('../routes')(app);

module.exports = app;
