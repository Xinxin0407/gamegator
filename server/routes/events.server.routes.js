// similar to listings.server.routes.js

/* Dependencies */
var express = require('express'),
  router = express.Router(),
  users = require('../controllers/users.server.controller.js'),
  events = require('../controllers/events.server.controller.js');

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/Home/Events')
  .get(events.list)
  .post(events.create);

router.route(':users')
  .get(users.display_all_users)
  .post(users.create_user);


/*
  The ':' specifies a URL parameter.
 */
router.route('/:eventId')
  .get(events.read)
  .put(events.update)
  .delete(events.delete);

router.route(':users/:username')
  .get(users.display_user)
  .put(users.update_user)
  .delete(users.delete_user);


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

router.param('eventId', events.eventByID);
router.param('username', users.userByName);

module.exports = router;
