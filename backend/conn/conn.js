const mongoose = require('mongoose');
require('dotenv').config();

// Use the correct syntax to access the environment variable
const mongoUrl = process.env.dburl;

// Set up MongoDB connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit process on connection error
});

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

module.exports = mongoose;
