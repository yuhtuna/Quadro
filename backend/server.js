require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;
const VULTR_MONGO_URI = process.env.VULTR_MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

mongoose.connect(VULTR_MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });
