const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      console.error('MONGO_URL not set in .env — cannot start without database');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected to:', uri);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
