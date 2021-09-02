const express = require("express");

const {
  addProduct,
  getAllProducts,
  getProduct,
  getUniforms,
  getStationary,
  updateProductDetails,
  deleteProduct,
} = require("../controllers/productControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Add a product
router.route("/addProduct").post(adminProtect, addProduct);

// Get all product details
router.route("/allProducts").get(getAllProducts);

// Get a particular product by id
router.route("/oneProduct/:id").get(getProduct);

// Get all products in uniform category
router.route("/uniforms").get(getUniforms);

// Get all products in stationary category
router.route("/stationary").get(getStationary);

// Update product details
router.route("/updateProduct/:id").put(adminProtect, updateProductDetails);

// Delete product
router.route("/deleteProduct/:id").delete(adminProtect, deleteProduct);

module.exports = router;
