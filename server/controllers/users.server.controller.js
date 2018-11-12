// similar to listings.server.controller.js

/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/users.server.model.js');

/* create a user */
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

/* Show the current user */
exports.display_user = function(req, res) {
  /* send back the event as json from the request */
  connection((db) => {
            db.collection('User')
                .findOne({ username: req.params.username })
                .then((user) => {
                    response.data = user;
                    res.json(response);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
};
/* Update a user */
exports.update_user = function(req, res) {
    connection((db) => {
        db.collection('User')
        update(
            { username: req.params.username},
            {
                "$set": {
                    password: req.body.password,
                    email: req.body.email,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at
                }
            }).exec(function(err,user){
                if (err){
                    console.log(err);
                    res.status(400).send(err);
                }
                else{
                    user.profile_img.data = fs.readFileSync(req.files.userPhoto.path);
                    user.profile_img.contentType = 'image/png';
                    res.json(user);
                }
        });
    });
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

/* user login */
exports.user_login = function (req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } 
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
}
// user register
exports.user_reigster = function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return next();
      }
    });
  }
}
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

