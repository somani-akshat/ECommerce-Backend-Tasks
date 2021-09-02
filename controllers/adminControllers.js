const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

// Get all user details - Admin Protected Route
const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("No User found");
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
    res.status(404);
    throw new Error("No Order found");
  }
});

module.exports = { getAllUserDetails, deleteUser, getAllOrderDetails };
