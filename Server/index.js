const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import the connectDB function
const itemRoutes = require('../Server/routes/Item');
const cors = require('cors')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', itemRoutes); // Assuming your routes are configured in items.js

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
