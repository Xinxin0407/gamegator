
var config = require('./config'),
  mongoose = require('mongoose'),
  express = require('./express');

module.exports.start = function() {
  var app = express.init();
  // app.listen using process.env.PORT to run with heroku
  // may not need, or can use localhost for testing
  app.listen(process.env.PORT || 3000, function() {
    var host = app.address().address;
    var port = app.address().port;
    console.log('App listening at http://%s:%s', host, port);
  });
};
