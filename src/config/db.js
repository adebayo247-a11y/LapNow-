import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const url = process.env.DB_URL || 'mongodb://localhost:27017/lapnow';
    await mongoose.connect(url);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;