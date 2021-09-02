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

module.exports = { addOrder };
