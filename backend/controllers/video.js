const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './backend/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
}).single('video');

// @desc    Process video
// @route   POST /api/video/process
// @access  Public
exports.processVideo = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    try {
      const newVideo = new Video({
        file_name: req.file.filename,
        file_path: req.file.path,
      });
      await newVideo.save();
      res.status(200).json({
        success: true,
        data: {
          message: 'Video processed successfully',
        },
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getVideos = async (req, res, next) => {
    try {
        const videos = await Video.find();
        res.status(200).json({ success: true, data: videos });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single video
// @route   GET /api/video/:id
// @access  Public
exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, error: 'Video not found' });
        }
        res.status(200).json({ success: true, data: video });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete video
// @route   DELETE /api/video/:id
// @access  Public
exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, error: 'Video not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
