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

module.exports = { addProduct };
