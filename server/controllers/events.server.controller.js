// similar to listings.server.controller.js

/* Dependencies */
var mongoose = require('mongoose'),
  Event = require('../models/events.server.model.js'),
  User = require('../models/users.server.model.js');

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Event */
  var event = new Event(req.body);

  /* Then save the event */
  event.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(event);
    }
  });
};

/* Show the current event */
exports.read = function(req, res) {
  /* send back the event as json from the request */
  res.json(req.event);
};

/* Update an event */
exports.update = function(req, res) {

  var event = req.event;
  // IF the user is the organizer
  if (req.body.username == req.body.organizer) {
    event.name = req.body.name;
    event.address = req.body.address;
    event.time = req.body.time;
    event.price = req.body.price;
    event.created_at = req.body.created_at;
    event.updated_at = req.body.updated_at;
    // have to save now that we updated
    event.save(function(err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(event);
      }
    });
  }
  //else if the user is admin
};

/* Update an event by admin*/
exports.update_by_admin = function(req, res) {
  var event = req.event;
  // IF the user is the organizer
  connection((db) => {
      db.collection('User')
        .find({ username: req.body.username, admin: true })
        .then((user) => {
          event.organizer = req.body.organizer
          event.name = req.body.name;
          event.address = req.body.address;
          event.time = req.body.time;
          event.price = req.body.price;
          event.created_at = req.body.created_at;
          event.updated_at = req.body.updated_at;
          event.save(function(err) {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            } else {
              res.json(event);
            }
          });
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
};


/* Delete a event */
exports.delete = function(req, res) {
  //verify user is an admin
  //get user
  //console.log(req);
  //Event.findByIdAndDelete(req.query.eventId, (something) => res.status(200).send(something));

  User.findById(req.session.userId, (err, user) => {
    console.log("User: " + user);
    //check if is admin
    if (user && user.admin)
      Event.findByIdAndDelete(req.query.eventId, res.status(200).end);
    else
      res.status(403).end();
  });
  /*
  var event = req.event;
  // if the user is the organizer
  if (req.body.username == req.body.organizer) {
    event.remove(function(err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.end();
      }
    });
  }
  */
};

/* Delete a listing */
exports.delete_by_admin = function(req, res) {
  var event = req.event;
  // if the user is admin
  connection((db) => {
      db.collection('User')
        .find({ username: req.body.username, admin: true })
        .then((user) => {
          event.remove(function(err) {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            } else {
              res.end();
            }
          });
        });
    });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Your code here */
  Event.find().sort('name').exec(function(err, events) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(events);
    }
  });
};

/* Retreive all the directory listings by admin, sorted alphabetically by listing code */
exports.list_by_admin = function(req, res) {
  connection((db) => {
      db.collection('User')
        .find({ username: req.body.username, admin: true })
        .then((user) => {
          Event.find().sort('name').exec(function(err, events) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json(events);
            }
        });
    });
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.eventByID = function(req, res, next, id) {
  Event.findById(id).exec(function(err, event) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.event = event;
      next();
    }
  });
};
