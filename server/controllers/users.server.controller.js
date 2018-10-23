// similar to listings.server.controller.js

/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/users.server.model.js');

/* Create a listing */
exports.create = function(req, res) {

    /* Instantiate a Event */
    var user = new User(req.body);

    /* Then save the event */
    user.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(user);
        }
    });
};

/* Show the current event */
exports.read = function(req, res) {
    /* send back the event as json from the request */
    res.json(req.user);
};

/* Update an event */
exports.update = function(req, res) {
    var user = req.user;
    /* Replace the article's properties with the new properties found in req.body */
    /* Save the article */
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.created_at = req.body.created_at;
    user.updated_at = req.body.updated_at;
    user.profile_img.data = fs.readFileSync(req.files.userPhoto.path);
    user.profile_img.contentType = 'image/png';
    // have to save now that we updated
    user.save(function(err) {
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
    var user = req.user;

    /* Remove the article */
    user.remove(function(err) {
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
    User.find().sort('username').exec(function(err, users){
        if(err){
            res.status(400).send(err);
        } else {
            res.json(users);
        }
    });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.userByID = function(req, res, next, id) {
    User.findById(id).exec(function(err, user) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.user = user;
            next();
        }
    });
};