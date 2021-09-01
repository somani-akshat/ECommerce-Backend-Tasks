const express = require("express");

const { addProduct } = require("../controllers/productControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Add a product
router.route("/addProduct").post(adminProtect, addProduct);

module.exports = router;
