const searchPhoneNumbersRoutes = require('./app/routes/searchPhoneNumbers');

const express = require('express');
const app = express();

app.use('/searchPhoneNumbers', searchPhoneNumbersRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 400;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json([{ err: err.message || 'An error as occured', name: null, num: null }]);
});

module.exports = app;
