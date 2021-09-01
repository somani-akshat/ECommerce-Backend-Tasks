const express = require("express");

const {
  registerUser,
  userLogin,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Register new user
router.route("/register").post(registerUser);

// Post user auth
router.route("/login").post(userLogin);

// User gets his/her own details
router.route("/userDetails").get(protect, getUserDetails);

// User updates his/her own details
router.route("/userUpdate").put(protect, updateUserDetails);

module.exports = router;
