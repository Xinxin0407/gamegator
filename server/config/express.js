var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  cors = require('cors');
  // may need --> eventsRouter = require('../routes/events.server.routes')

module.exports.init = function() {
  // connect to database
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true
  });

  // initialize app
  var app = express();

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());

  // cors
  app.use(cors());

  // Serve static files

  // Use the events router for requests to the api */

  // go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    console.log('redirected.\n')
    res.redirect('/');
  });

  return app;
};
