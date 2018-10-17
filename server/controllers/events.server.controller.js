// similar to listings.server.controller.js

/* Dependencies */
var mongoose = require('mongoose'),
    Event = require('../models/events.server.model.js');

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Event */
  var event = new Event(req.body);

  /* Then save the event */
  event.save(function(err) {
    if(err) {
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
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  event.organizer = req.body.organizer;
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
};

/* Delete a listing */
exports.delete = function(req, res) {
  var event = req.event;

  /* Remove the article */
  event.remove(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else{
      res.end();
    }
  })
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Your code here */
    Event.find().sort('name').exec(function(err, events){
      if(err){
        res.status(400).send(err);
      } else {
        res.json(events);
      }
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
    if(err) {
      res.status(400).send(err);
    } else {
      req.event = event;
      next();
    }
  });
};
