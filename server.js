'use strict';


// 3rd party packages

const express = require('express');
const app = express();


// internal - custom node module
const stamper = require('./middleware/stamper.js');
const notFoundHandler = require('./handlers/404.js');
const errors = require('./handlers/500.js');

app.get('/', stamper, (req, res) => {
  res.status(200).send('Hello World')
})

app.get('/test-route', (req, res) => {
  res.json({ msg: 'this worked' });
});

// route level middleware happens in the middle of the process
app.get('/data', stamper, (req, res) => {
  let outputObject = {
    10: "even",
    5: "odd",
    "time": req.timestamp // we got this from the middleware
  }

  res.status(200).json(outputObject);
});

app.get('/bad', (req, res, next) => {
  next('you messsed up')
});

// app.use -> global middleware function - all incoming requests will pipe through this

// error handlers live at the bottom of your server file
app.use('*', notFoundHandler);
app.use(errors);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`))
}

module.exports = {
  app: app,
  start: start
}