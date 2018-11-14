// similar to listings.server.routes.js

/* Dependencies */
var express = require('express'),
  router = express.Router(),
  Events = require('../controllers/events.server.controller.js');

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/events')
  .get(Events.list)
  .post(Events.create);

/*
  The ':' specifies a URL parameter.
 */
router.route('/:eventId')
  .get(Events.read)
  .put(Events.update)
  .delete(Events.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.
  Say we make an example request to '/listings/566372f4d11de3498e2941c9'
  The request handler will first find the specific listing using this 'listingsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.
  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
<<<<<<< HEAD
router.param('eventId', Events.eventByID);
=======
router.param('eventId', events.eventByID);
//router.param('username', users.userByName);
>>>>>>> 12e20389f197212c4b055b1e4bba59b7f607dee5

module.exports = router;
