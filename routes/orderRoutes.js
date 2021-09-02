const express = require("express");
const { addOrder, getOrder } = require("../controllers/orderControllers");
const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Create new order
router.route("/addOrder").post(protect, addOrder);

// Get details of a particular order for user
router.route("/userOrder/:id").get(protect, getOrder);

module.exports = router;
