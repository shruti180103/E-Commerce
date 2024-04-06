const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
      throw new ErrorHandler("Name, email, and password are required", 400);
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler("User already exists", 400);
    }

    // Create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: password
    });

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;



