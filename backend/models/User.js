const mongoose = require('mongoose');

const objectFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filecontent: {
    type: String,
    required: true,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [objectFileSchema],
});

module.exports = mongoose.model('User', userSchema);
