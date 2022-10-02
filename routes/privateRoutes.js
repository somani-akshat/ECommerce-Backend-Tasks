const express = require("express");

const {
  registerUser,
  userLogin,
  updateUserDetails,
  getUserDetails,
  getAllUserDetails,
} = require("../controllers/userControllers");

const { protect, adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Register new user
router.route("/userRegister").post(registerUser);

// Post user auth
router.route("/userLogin").post(userLogin);

// User gets his/her own details - Only logged in user
router.route("/userDetails/:id").get(protect, getUserDetails);

// User updates his/her own details - Only logged in user
router.route("/userUpdate/:id").put(protect, updateUserDetails);

// Get all users
router.route("/getAllDetails").get(adminProtect, getAllUserDetails);

module.exports = router;
