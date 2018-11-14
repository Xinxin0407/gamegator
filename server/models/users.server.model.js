// similar to listings.server.model.js

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
<<<<<<< HEAD
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

/* Create schema */
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
=======
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

/* Create schema */
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true}
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_img: {
        data: Buffer,
        contentType: String
    },
    created_at: Date,
    updated_at: Date,
    admin: Boolean
});

/* 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function (next) {
    var user = this;
    var currentTime = new Date;
    user.updated_at = currentTime;
    if (!user.created_at) {
        user.created_at = currentTime;
    }
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    next();
});

userSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({username: username})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
>>>>>>> 12e20389f197212c4b055b1e4bba59b7f607dee5

// hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// Instantiate and export Mongoose model
var User = mongoose.model('User', UserSchema);
module.exports = User;
