const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

// Get all user details - Admin Protected Route
const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(400).json({
      message: "No user found",
    });
  }
});

// Delete a user account - Admin Protected Route
const deleteUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User Account deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "No user found",
    });
  }
});

// Get all order details - Admin Protected Route
const getAllOrderDetails = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders.length > 0) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

// Update Order status to paid after the Online Payment is done
const updateOrderStatusToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.currentStatus = "Order is received and is being processed";
    order.paidAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

// Update Order status to Processed after the order is processed by seller and ready to ship by the courier company
const updateOrderStatusToProcessed = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isProcessed = true;
    order.currentStatus = "Order is ready for shipping";
    order.processedAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

// Update Order status to Shipped after the order is shipped
const updateOrderStatusToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isShipped = true;
    order.currentStatus = "Order is shipped and will reach soon";
    order.shippedAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

// Update Order status to Delivered after the order is delivered
const updateOrderStatusToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.currentStatus = "Order is delivered. Thank you !";
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

module.exports = {
  getAllUserDetails,
  deleteUser,
  getAllOrderDetails,
  updateOrderStatusToPaid,
  updateOrderStatusToProcessed,
  updateOrderStatusToShipped,
  updateOrderStatusToDelivered,
};
