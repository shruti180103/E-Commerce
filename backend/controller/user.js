const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

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
    const user = {
      name: name,
      email: email,
      password: password,
    };
    
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
module.exports = router;
