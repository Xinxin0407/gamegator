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
router.route('/Home/events')
  .get(events.list)
  .post(events.create)
  .delete(events.delete);

router.route('/users/admin')
  .get(users.verify_admin);

router.route('/users/rsvp').post(users.rsvp);
router.route('/users/favorite').post(users.favorite);

router.route('/users')
  .get(users.display_all_users)
  .delete(users.delete_user);

router.route('/user')
  .get(users.get_user);

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


module.exports = router;
