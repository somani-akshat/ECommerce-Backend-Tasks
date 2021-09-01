const express = require("express");

const {
  getAllUserDetails,
  deleteUser,
} = require("../controllers/adminControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Get all user details
router.route("/allUserDetails").get(adminProtect, getAllUserDetails);
// Delete user account
router.route("/deleteUser/:id").delete(adminProtect, deleteUser);

module.exports = router;
