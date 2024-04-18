const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  origin: String,
  color: String,
  size: String,
  price: {
    type: Number,
    required: true
  },
  itemsRemaining: {
    type: Number,
    default: 100,
    required: true
  },
  image: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
