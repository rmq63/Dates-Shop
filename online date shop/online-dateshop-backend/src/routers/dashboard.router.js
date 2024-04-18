const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');

// define routes
router.get('/', DashboardController.dashboard);

module.exports = router;