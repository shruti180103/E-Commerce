const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

// Create user
router.post("/create-user", async (req, res, next) => {
  try {

    const { name, email, password } = req.body;
    
    console.log(req.body)
    // Check if user with provided email already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Create new user object
    const user = {
      name,
      email,
      password,
    };


    // Create activation token
    const activationToken = createActivationToken(user);

    // Construct activation URL
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      console.log(user)
      // Create a new user document
      const newUser = new User({ name, email, password });
  
      // Save the user document to the database
      await newUser.save();
  
      console.log('User added successfully:', newUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }



    try {
      // Send activation email
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      // Respond with success message
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      // Handle email sending error
      console.error("Error sending email:", error);
      return next(new ErrorHandler("Failed to send activation email", 500));
    }
  } catch (error) {
    // Handle database query error
    console.error("Error creating user:", error);
    return next(new ErrorHandler("Failed to create user", 400));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
