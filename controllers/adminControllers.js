const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

module.exports = { getAllUserDetails };
