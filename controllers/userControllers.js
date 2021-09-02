const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/generateToken");

// New user
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, isAdmin } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({ name, email, password, isAdmin });
    // const userId = user._id;
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        message: "User Register Successful",
      });
    } else {
      res.status(404).json({
        message: "User not created",
      });
    }
  }
});

// Login existing users
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      message: "User Login Successful",
    });
  } else {
    res.status(404).json({
      message: "Invalid email or password",
    });
  }
});

// User can see his/her details - Protected Route
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({
      message: "User not Found",
    });
  }
});

// User updates his/her own details
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      message: "User details updated successfully",
    });
  } else {
    res.status(404);
    res.json({
      message: "User not Found",
    });
    // throw new Error("User not Found");
  }
});

module.exports = { registerUser, userLogin, getUserDetails, updateUserDetails };
