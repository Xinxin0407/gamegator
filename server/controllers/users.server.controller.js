// similar to listings.server.controller.js

// dependencies
var mongoose = require('mongoose'),
  User = require('../models/users.server.model.js');

// create a user
exports.create_user = function(req, res) {
  var newUser = req.body;
  if (!req.body.username) {
    sendError("Invalid user input must provide a username.", res)
  }

  connection((db) => {
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

exports.delete_user = function(req, res) {
  User.findById(req.session.userId, (err, user) => {
    if (err) console.log(err);
    console.log("User: " + user);
    //check if is admin
    if (user && user.admin)
      User.findByIdAndDelete(req.query.userId, res.status(200).end);
    else
      res.status(403).end();
  });
};

exports.get_user = function(req, res){
  User.findById(req.session.userId, (err, user) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(user);

  })
}
exports.display_all_users = function(req, res) {
  /* send back all users as json from the request */
  //change : to /
  User.find((err, docs) => res.status(200).end(JSON.stringify(docs)));
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
    update({ username: req.params.username }, {
      "$set": {
        password: req.body.password,
        email: req.body.email,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      }
    }).exec(function(err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        user.profile_img.data = fs.readFileSync(req.files.userPhoto.path);
        user.profile_img.contentType = 'image/png';
        res.json(user);
      }
    });
  });
};

exports.rsvp = function(req, res){
  //console.log(req);
  const eventId = req.query.eventId;
  User.findById(req.session.userId, (err, user) => {
    if (err) console.log(err);
    if (!user.rsvp) user.rsvp = [eventId];
    console.log("success");
    user.save((err, updatedUser) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(updatedUser);
    });
    /*
    tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
    */

  });
}

exports.favorite = function(req, res){
  const eventId = req.query.eventId;
  Users.findById(req.session.userId, (err, user) => {
    if (!user.favorites) user.favorites = [];
    user.favorites.push(eventId);
    user.save((err, updatedUser) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(updatedUser);
    });
    /*
    tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
    */

  });
}

exports.verify_admin = function(req, res) {
  if (!req.session.userId) {
    res.status(403).send(false);
    return;
  }
  User.findById(req.session.userId, (err, user) => {
    if (user.admin) res.status(200).send(/*"Ye endtimes draw near, for the admin Himself has cometh."*/true)
    else res.status(200).send(/*"Thou art not He who administrates"*/false);
  });

};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.userByName = function(req, res, next, name) {
  user.findOne({ username: name }).exec(function(err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
