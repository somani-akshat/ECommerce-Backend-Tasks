const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrderDetails,
} = require("../controllers/orderControllers");
const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Create new order
router.route("/addOrder").post(protect, addOrder);

// Get details of a particular order for user
router.route("/userOrder/:id").get(protect, getOrder);

// Get details of all orders for user
router.route("/allOrders").get(protect, getAllOrders);

// Update details of order for user
router.route("/updateOrder/:id").put(protect, updateOrderDetails);

module.exports = router;
