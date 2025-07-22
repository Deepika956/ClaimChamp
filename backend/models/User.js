const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String, // file path, e.g., 'uploads/12345.jpg'
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
