const express = require("express");

const {
  getAllUserDetails,
  deleteUser,
  getAllOrderDetails,
  updateOrderStatusToPaid,
  updateOrderStatusToProcessed,
  updateOrderStatusToShipped,
  updateOrderStatusToDelivered,
} = require("../controllers/adminControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Get all user details
router.route("/allUserDetails").get(adminProtect, getAllUserDetails);

// Delete user account
router.route("/deleteUser/:id").delete(adminProtect, deleteUser);

// Get all order details
router.route("/allOrderDetails").get(adminProtect, getAllOrderDetails);

// Update Order status to paid after the Online Payment is done
router
  .route("/updateOrderStatusToPaid/:id")
  .put(adminProtect, updateOrderStatusToPaid);

// Update Order status to Processed after the order is processed by seller and ready to ship by the courier company
router
  .route("/updateOrderStatusToProcessed/:id")
  .put(adminProtect, updateOrderStatusToProcessed);

// Update Order status to Shipped after the order is shipped
router
  .route("/updateOrderStatusToShipped/:id")
  .put(adminProtect, updateOrderStatusToShipped);

// Update Order status to Delivered after the order is delivered
router
  .route("/updateOrderStatusToDelivered/:id")
  .put(adminProtect, updateOrderStatusToDelivered);

module.exports = router;
