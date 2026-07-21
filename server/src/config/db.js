const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected');
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.info({ host: mongoose.connection.host }, 'MongoDB connected');
  } else {
    logger.info('MongoDB connected');
  }
};

module.exports = connectDB;
