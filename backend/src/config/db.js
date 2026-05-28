const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    throw new Error(
      `MongoDB connection failed: ${error.message}. ` +
        'Check MONGODB_URI, Atlas username/password, and Network Access (allow 0.0.0.0/0).'
    );
  }
};

module.exports = connectDB;
