const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  googleId : {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },
  userName: {
    type: String
  }


  
});

module.exports = mongoose.model('User', userSchema);

