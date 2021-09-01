const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  var token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      // console.log(decode);
      // decode has _id and creation time of the user whose this token is

      req.user = await User.findById(decode.id);
      console.log(req.user.name);

      // next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
      // next();
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

  next();
});

module.exports = { protect };
