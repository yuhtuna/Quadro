const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const videoRoutes = require('./routes/video');

const app = express();
const PORT = process.env.PORT || 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', userRoutes);
app.use('/api/video', videoRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });
