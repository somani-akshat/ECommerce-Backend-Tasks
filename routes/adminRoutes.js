const express = require("express");

const { getAllUserDetails } = require("../controllers/adminControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Register new user
router.route("/allUserDetails").get(adminProtect, getAllUserDetails);

module.exports = router;
