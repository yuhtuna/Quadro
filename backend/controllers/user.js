const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('[REGISTER] Request received');
    console.log('[REGISTER] Request body:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('[REGISTER] Missing required fields');
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    console.log('[REGISTER] Checking if user exists:', username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('[REGISTER] User already exists');
      return res.status(400).json({ error: 'Username already taken' });
    }
    
    console.log('[REGISTER] Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    
    console.log('[REGISTER] Creating user with ID:', userId);
    const user = new User({ userId, username, password: hashedPassword });
    
    console.log('[REGISTER] Saving user to database...');
    await user.save();
    
    console.log('[REGISTER] User registered successfully:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('[REGISTER] Error:', error.message);
    console.error('[REGISTER] Stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('[LOGIN] Request received');
    console.log('[LOGIN] Request body:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('[LOGIN] Missing required fields');
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    console.log('[LOGIN] Looking for user:', username);
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('[LOGIN] User not found:', username);
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    console.log('[LOGIN] User found, validating password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for user:', username);
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    console.log('[LOGIN] Password valid, generating token...');
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    
    console.log('[LOGIN] Login successful for user:', username);
    res.status(200).json({ token });
  } catch (error) {
    console.error('[LOGIN] Error:', error.message);
    console.error('[LOGIN] Stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
};
