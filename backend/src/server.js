require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];

const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Set them in the Render dashboard under Environment.'
    );
  }
};

const startServer = async () => {
  try {
    validateEnv();
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    if (process.env.NODE_ENV === 'production') {
      console.error(
        'Tip: In Render → Environment, set MONGODB_URI (Atlas URI) and JWT_SECRET. ' +
          'In MongoDB Atlas → Network Access, allow 0.0.0.0/0 for Render.'
      );
    }
    process.exit(1);
  }
};

startServer();
