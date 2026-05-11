const mongoose = require('mongoose');

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } else {
    console.log('MongoDB connected');
  }
};

module.exports = connectDB;
