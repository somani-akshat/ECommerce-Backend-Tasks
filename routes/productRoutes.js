const express = require("express");

const {
  addProduct,
  getAllProducts,
  getProduct,
} = require("../controllers/productControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Add a product
router.route("/addProduct").post(adminProtect, addProduct);

// Get all product details
router.route("/allProducts").get(getAllProducts);

// Get a particular product by id
router.route("/oneProduct/:id").get(getProduct);

module.exports = router;
