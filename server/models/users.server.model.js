// similar to listings.server.model.js

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

/* Create schema */
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
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
    }
    created_at: Date,
    updated_at: Date
});

/* 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
    var user = this;
    var currentTime = new Date;
    user.updated_at = currentTime;
    if(!user.created_at)
    {
        user.created_at = currentTime;
    }
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/* Instantiate Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export to make it available to other parts of application */
module.exports = User;
