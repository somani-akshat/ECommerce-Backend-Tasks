const asyncHandler = require("express-async-handler");
// const { createStore } = require("redux");
const Order = require("../models/orderModel");
// const mongoose = require("mongoose");

// Create order - Only for logged in users
const addOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Please add products");
  } else {
    var itemsPrice = Number(
      orderItems.reduce((acc, item) => acc + item.price, 0)
    );
    var taxPrice = Number(0.15 * itemsPrice);
    var shippingPrice = Number(itemsPrice > 500 ? 0 : 50);
    var totalPrice =
      Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice);

    // console.log(itemsPrice);
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// Get details of a particular order for user - Only logged in users
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = req.user;
  if (order) {
    console.log(order.user.toString());
    console.log(user._id.toString());
    if (order.user.toString() === user._id.toString()) {
      res.status(200).json(order);
    } else {
      res.status(404).json({
        message: "User not authprized to view this order details",
      });
    }
  } else {
    res.status(404).json({
      message: "No Order found",
    });
  }
});

module.exports = { addOrder, getOrder };
