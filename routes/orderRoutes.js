const express = require("express");
const { addOrder } = require("../controllers/orderControllers");
const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Create new order
router.route("/addOrder").post(protect, addOrder);

module.exports = router;
