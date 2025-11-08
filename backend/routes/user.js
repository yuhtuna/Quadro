const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

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

module.exports = router;
