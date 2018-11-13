var config = require('./config'),
  mongoose = require('mongoose'),
  express = require('./express');

module.exports.start = function() {
  var app = express.init();
  // app.listen using process.env.PORT to run with heroku
  // may not need, or can use localhost for testing
  var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
  });

  //TODO FIND FIX
  /*
  //use sessions for tracking logins
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));
  */
};
