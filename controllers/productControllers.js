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

// Get all products in uniform category
const getUniforms = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "uniform" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      message: "No Uniforms found",
    });
  }
});

// Get all products in stationary category
const getStationary = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "stationary" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      message: "No Stationary items found",
    });
  }
});

// Update a product - Only Admins have access to it
const updateProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.image) {
      product.image = req.body.image;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.material) {
      product.material = req.body.material;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.rating) {
      product.rating = req.body.rating;
    }
    if (req.body.numReviews) {
      product.numReviews = req.body.numReviews;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.countInStock) {
      product.countInStock = req.body.countInStock;
    }

    const updatedProduct = await product.save();
    res.json({
      _id: updatedProduct._id,
      Admin: updatedProduct.Admin,
      name: updatedProduct.name,
      image: updatedProduct.image,
      category: updatedProduct.category,
      material: updatedProduct.material,
      description: updatedProduct.description,
      rating: updatedProduct.rating,
      numReviews: updatedProduct.numReviews,
      price: updatedProduct.price,
      countInStock: updatedProduct.countInStock,
      message: "Product details updated successfully",
    });
  } else {
    // ERROR
    res.status(400).json({
      message: "Product not Found",
    });
  }
});

// Delete a product - Only Admins have access to it
const deleteProduct = asyncHandler(async (req, res) => {
  const productExists = await Product.findById(req.params.id);
  if (productExists) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    // ERROR
    res.status(400).json({
      message: "No product found",
    });
  }
});

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  getUniforms,
  getStationary,
  updateProductDetails,
  deleteProduct,
};
