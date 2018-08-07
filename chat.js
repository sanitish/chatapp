const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  isRecived: {
    type: Boolean
  }

});

var Chat = mongoose.model('chat', UserSchema);
module.exports = Chat;
