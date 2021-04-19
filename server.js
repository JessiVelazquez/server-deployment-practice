'use strict';


// 3rd party packages

const express = require('express');
const app = express();


// internal - custom node module
const stamper = require('./middleware/stamper.js');
const notFoundHandler = require('./handlers/404.js');
const errors = require('./handlers/500.js');

app.get('/test-route', (req, res) => {
  res.json({ msg: 'this worked' });
});

// route level middleware happens in the middle of the process
app.get('/data', stamper, (req, res) => {
  let output = { time: req.timestamp }
  res.json(output);
})

app.get('purposeful-error', (req, res, next) => {
  next('some words');
});

// app.use -> global middleware function - all incoming requests will pipe through this

// error handlers live at the bottom of your server file
app.use('*', notFoundHandler);
app.use(errors);

function start(port) {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start
}