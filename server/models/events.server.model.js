// similar to listings.server.model.js

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
    
/* Create schema */
var eventSchema = new Schema({ 
  organizer: {
    type: String,
    required: true
  }
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
  price: Number,
  created_at: Date,
  updated_at: Date
});

/* 'pre' function that adds the updated_at (and created_at if not already there) property */
eventSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Instantiate Mongoose model */
var Event = mongoose.model('Event', eventSchema);

/* Export to make it available to other parts of application */
module.exports = Event;
