const User = require('../models/users.model');
const Product = require('../models/product.model');
const Order = require('../models/orders.model');

// dashboard
exports.dashboard = async (req, res) => {
  try {
    const users = await User.find();
    const products = await Product.find();
    const orders = await Order.find({ status: 'pending' });

    res.status(200).send({
      data: {
        totalUsers: users.length,
        totalProducts: products.length,
        totalPendingOrders: orders.length,
      }
    });
  } catch (error) {

  }
} 