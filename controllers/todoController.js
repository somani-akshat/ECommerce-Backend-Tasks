const asyncHandler = require("express-async-handler");
const TODO = require("../models/todoModel");

// Create Todo - Only for logged in users
const addTodo = asyncHandler(async (req, res) => {
  const { description } = req.body;

  const todo = new TODO({
    user: req.user._id,
    description,
    addedAt: new Date(),
  });

  const createTodo = await todo.save();

  res.status(201).json({
    success: true,
    data: {
      _id: createTodo._id,
      user: createTodo.user,
      description: createTodo.description,
      addedAt: createTodo.addedAt,
    },
  });
});

// Get details of all orders for user - Only logged in users
const getAllTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const todos = await TODO.find({ user: userId });
  if (todos.length > 0) {
    res.status(200).json({
      success: true,
      data: todos,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No Orders found",
    });
  }
});

module.exports = {
  addTodo,
  getAllTodos,
};