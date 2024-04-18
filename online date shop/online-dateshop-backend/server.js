const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// routers
const userRouter = require('./src/routers/users.router')
const productRouter = require('./src/routers/product.router')
const orderRouter = require('./src/routers/orders.router')
const authRouter = require('./src/routers/auth.router')
const dashboardRouter = require('./src/routers/dashboard.router')

// MongoDB Connection URI
const MONGODB_URI = 'mongodb://localhost:27017/online-date-shop';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Define routes
app.get('/', (req, res) => {
  res.send('Hello welcome from the server of the online date shop...');
});
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Online date shop Server is running on port ${PORT}`);
});
