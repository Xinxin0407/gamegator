// similar to listings.server.controller.js

// dependencies
var mongoose = require('mongoose'),
    User = require('../models/users.server.model.js');

// create a user
exports.create_user = function(req, res){
    var newUser = req.body;
    if (!req.body.username){
        sendError("Invalid user input must provide a username.", res)
    }

    connection((db)=>{
        db.collection('User')
            .insertOne(newUser)
            .then((user) => {
                response.data = user;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
};

exports.display_all_users = function(req,res){
    /* send back the event as json from the request */
    connection((db) => {
        db.collection('User')
            .find()
            .toArray()
            .then((users) => {
                response.data = user;
                res.json(response);
            })
            .catch((err) => {
                sendError(err,res);
            });
    });
};

/* Update a user */
exports.update_user = function(req,res){
    connection((db) => {
        db.collection('User')
        update({username: req.params.username},
            {"$set": { password: req.body.password, email: req.body.email,
                created_at: req.body.created_at, updated_at: req.body.updated_at,
                profile_img.data: fs.readFileSync(req.files.userPhoto.path),
                profile_img.contentType: 'imapge/png'}}).exec(function(err,user){
                    if (err){
                        console.log(err);
                        res.status(400).send(err);
                    }
                    else {
                        res.json(user);
                    }
        });
    })
};

/* Delete a user */
exports.delete_user = function(req,res){
    connection((db) =>{
        db.collection('User')
            .findOneAndRemove({username: req.params.username})
            .then((user) =>{
                response.data = req.params.username;
                res.json(response);
            })
            .catch((err)=>{
                sendError(err,res);
                });
    });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.UserByName = function(req, res, next, name) {
    User.findOne(username:name).exec(function(err, user) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.user = user;
            next();
        }
    });
};
