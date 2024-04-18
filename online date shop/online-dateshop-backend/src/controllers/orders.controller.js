const Order = require('../models/orders.model');
const MyQueryHelper = require("../configs/api.config")

// Controller function to create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all orders with pagination
exports.getOrders = async (req, res) => {
  try {
    // Finding all orders data from the database and populating the userId field with user information
    const orders = await Order.find().populate({
      path: 'userId',
      select: 'username email' // Select the user fields you want to include
    }).populate({
      path: 'items.productId', // Populate the productId field in items array
      select: 'type image' // Select the product fields you want to include
    });

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Filtering orders based on different types query
    const productQuery = new MyQueryHelper(Order.find().populate({
      path: 'userId',
      select: 'username email' // Select the user fields you want to include
    }).populate({
      path: 'items.productId', // Populate the productId field in items array
      select: 'type image' // Select the product fields you want to include
    }), req.query).search('type').sort().paginate();

    const findOrders = await productQuery.query;

    // Format the response to have user instead of userId and productName instead of productId
    const formattedOrders = findOrders.map(order => {
      const formattedOrder = order.toObject(); // Convert Mongoose document to plain JavaScript object
      formattedOrder.user = formattedOrder.userId; // Rename userId to user
      delete formattedOrder.userId; // Remove userId
      // Rename productId to productName
      formattedOrder.items.forEach(item => {
        item.product = item.productId;
        delete item.productId;
      });
      return formattedOrder;
    });

    res.status(200).json({
      data: formattedOrders,
      total_rows: findOrders.length,
      response_rows: findOrders.length,
      total_page: req?.query?.keyword ? Math.ceil(findOrders.length / req.query.limit) : Math.ceil(formattedOrders.length / req.query.limit),
      current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all orderr by user id
exports.gerOrderByUserId = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId }).populate({
      path: 'items.productId', // Populate the productId field in items array
      select: 'type image' // Select the product fields you want to include
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update the status of an order by ID
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
