const express = require("express");

const {
  registerUser,
  userLogin,
  getUserDetails,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Register new user
router.route("/register").post(registerUser);

// Post user auth
router.route("/login").post(userLogin);

// User gets his/her own details
router.route("/userDetails").get(protect, getUserDetails);

module.exports = router;
