var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  cors = require('cors'),
  eventsRouter = require('../routes/events.server.routes');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

module.exports.init = function() {
  // connect to database
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true
  });
  var db = mongoose.connection;

  // initialize app
  var app = express();

  // enable request logging for development debugging
  app.use(morgan('dev'));
  
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function () {
        // we're connected!
    });
    //use sessions for tracking logins
    app.use(expressSession({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db
        })
    }));


  // body parsing middleware
  app.use(bodyParser.json());

  // cors
  app.use(cors());

  // Serve static files
  app.use('/', express.static(__dirname + '/../../client'));
  app.use('/MyEvents', express.static(__dirname + '/../../client/MyEvents'));
  app.use('/About', express.static(__dirname + '/../../client/About'));
  // Use the events router for requests to the api */
  app.use(eventsRouter);

  // go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    res.redirect('/');
  });

  return app;
};
