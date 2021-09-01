const express = require("express");

const { registerUser, userLogin } = require("../controllers/userControllers");

const router = express.Router();

// Register new user
router.route("/register").post(registerUser);

// Post user auth
router.route("/login").post(userLogin);

module.exports = router;
