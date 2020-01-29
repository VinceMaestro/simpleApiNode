// const express = require('express');
// const app = express();
// const MongoClient = require ('mongodb').MongoClient;
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// const db = {};
// require('./app/routes')(app, db);
// const port = 8000;

// app.listen(port, () => {
//   console.log('Live on port : ' + port);
// });

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port);
