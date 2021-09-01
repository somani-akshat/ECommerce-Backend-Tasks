const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Only admins can add a product - AdminProtected Route
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    material,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;
  const Admin = req.user._id;

  const product = await Product.create({
    Admin,
    name,
    image,
    category,
    material,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      Admin: product.Admin,
      name: product.name,
      image: product.image,
      category: product.category,
      material: product.material,
      description: product.description,
      rating: product.rating,
      numReviews: product.numReviews,
      price: product.price,
      countInStock: product.countInStock,
      message: "Product Created Successfully",
    });
  } else {
    res.status(404).json({
      message: "Product not created",
    });
  }
});

// Get details of all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      message: "No Product found",
    });
  }
});

// Get details of a particular products
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      message: "No Product found",
    });
  }
});

module.exports = { addProduct, getAllProducts, getProduct };
