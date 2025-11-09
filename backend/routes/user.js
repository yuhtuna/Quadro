const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', userController.register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get current user
 *     description: Get the details of the currently logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, userController.getMe);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Get the details of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       404:
 *         description: User not found
 */
router.get('/:userId', userController.getUser);

module.exports = router;
