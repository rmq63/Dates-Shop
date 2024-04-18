const Product = require('../models/product.model');
const MyQueryHelper = require("../configs/api.config")

// Controller function to create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all products with pagination
exports.getProducts = async (req, res) => {
  try {
    // finding all products data from database
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({ message: "no product found" });
    }

    // filtering products based on different types query
    const productQuery = new MyQueryHelper(Product.find(), req.query).search('type').sort().paginate();
    const findProducts = await productQuery.query;

    const mappedProduct = findProducts?.map((data) => ({
      _id: data._id,
      description: data.description,
      image: data.image,
      itemsRemaining: data.itemsRemaining,
      origin: data.origin,
      type: data.type,
      price: data.price,
      color: data.color,
      size: data.size
    }));

    res.status(200).json({
      data: mappedProduct,
      total_rows: products.length,
      response_rows: findProducts.length,
      total_page: req?.query?.keyword ? Math.ceil(findProducts.length / req.query.limit) : Math.ceil(products.length / req.query.limit),
      current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a product by ID
exports.updatedProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to update the stock
exports.updateStock = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { itemsRemaining: req.body.itemsRemaining });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
