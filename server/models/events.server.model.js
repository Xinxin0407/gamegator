// similar to listings.server.model.js

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create schema */
var EventSchema = new Schema({
  organizer: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    Keywords: [{
        name:String
    }],
  price: Number,
  created_at: Date,
  updated_at: Date
});

/* 'pre' function that adds the updated_at (and created_at if not already there) property */
EventSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Instantiate Mongoose model */
var Event = mongoose.model('Event', EventSchema);

/* Export to make it available to other parts of application */
module.exports = Event;
