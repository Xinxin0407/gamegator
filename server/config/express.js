var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  cors = require('cors'),
  MongoStore = require('connect-mongo')(session);

module.exports.init = function() {
  // connect to database
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true
  });
  var db = mongoose.connection;

  //handle mongo error
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });

  // initialize app
  var app = express();

  //use sessions for tracking logins
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // cors
  app.use(cors());

  // Serve static files
  app.use('/', express.static(__dirname + '/../../client/LogReg'));
  app.use('/Home', express.static(__dirname + '/../../client'));
  app.use('/MyEvents', express.static(__dirname + '/../../client/MyEvents'));
  app.use('/About', express.static(__dirname + '/../../client/About'));
  // Use the events router for requests to the api */
  // app.use(eventsRouter);
  // include routes
  var userRoutes = require('../routes/users.server.routes.js');
  var eventRouter = require('../routes/events.server.routes');
  app.use('/', userRoutes);
  app.use('/Home', eventRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  // define as the last app.use callback
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

  // go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    res.redirect('/');
  });

  return app;
};
