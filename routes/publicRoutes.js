const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  var token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log("decode", decode);
      const newUser = await User.findById(decode.id);
      console.log(newUser);

      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        data: error,
      });
      next();
    }
  }

  if (token === "") {
    res.status(400).json({
      success: false,
      data: "Not authorized, no token found",
    });
    next();
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const decode = jwt.verify(token, process.env.JWT_KEY);

      // decode has _id and creation time of the user whose this token is
      const user = await User.findById(decode.id);
      if (user.isAdmin === true) {
        req.user = user;
      } else {
        res.status(400).json({
          success: false,
          data: "User is not Admin",
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        data: "Not authorized, token failed",
      });
      next();
    }
  }
  if (!token) {
    res.status(400).json({
      success: false,
      data: "Not authorized, no token found",
    });
    next();
  }
});

module.exports = { protect, adminProtect };
