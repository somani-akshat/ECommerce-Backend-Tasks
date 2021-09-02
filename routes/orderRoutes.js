const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrderDetails,
  cancelOrder,
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

// Update details of order for user
router.route("/cancelOrder/:id").delete(protect, cancelOrder);

module.exports = router;
