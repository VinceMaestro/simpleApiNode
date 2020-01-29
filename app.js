const bodyParser = require('body-parser');
const searchPhoneNumbersRoutes = require('./searchPhoneNumbers');

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', searchPhoneNumbersRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 400;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    err: {
      message: err.message || 'An error as occured'
    }
  });
});

module.exports = app;
