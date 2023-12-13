const mongoose = require('mongoose');

// Define the Item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create the Item model using the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
