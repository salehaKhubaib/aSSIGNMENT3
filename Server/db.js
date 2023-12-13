const mongoose = require('mongoose');
require('dotenv').config();

const api_uri =  process.env.API_KEY;

const connectDB = async () => {
  try {
    await mongoose.connect(api_uri, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
