const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orders.controller');

// Define routes
router.get('/', OrderController.getOrders);
router.get('/all', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.get('/user/:userId', OrderController.gerOrderByUserId);
router.post('/', OrderController.createOrder);
router.put('/:id/status', OrderController.updateOrderStatus);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
