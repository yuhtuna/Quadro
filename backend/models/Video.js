const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  file_path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Video', videoSchema);
