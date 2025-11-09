const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/video/process:
 *   post:
 *     summary: Process a video
 *     description: Upload a video for processing.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video processed successfully
 *       400:
 *         description: Bad request
 */
router.post('/process', protect, videoController.processVideo);

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Get all videos
 *     description: Retrieve a list of all videos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of videos
 *       400:
 *         description: Bad request
 */
router.get('/', protect, videoController.getVideos);

/**
 * @swagger
 * /api/video/{id}:
 *   get:
 *     summary: Get a single video
 *     description: Retrieve a single video by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single video
 *       404:
 *         description: Video not found
 */
router.get('/:id', protect, videoController.getVideo);

/**
 * @swagger
 * /api/video/{id}:
 *   delete:
 *     summary: Delete a video
 *     description: Delete a single video by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 */
router.delete('/:id', protect, videoController.deleteVideo);

module.exports = router;
