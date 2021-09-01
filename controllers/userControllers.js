const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

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
        // token: jwt.sign({ userId }, process.env.JWT_KEY),
        message: "User Register Successful",
      });
    } else {
      res.status(404);
      throw new Error("User not created");
    }
  }
});

// Login existing users
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const userId = user._id;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //   return jwt.sign(( user._id ), process.env.JWT_KEY);
      token: jwt.sign({ userId }, process.env.JWT_KEY),
      message: "User Login Successful",
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, userLogin };
