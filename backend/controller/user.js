const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// Create user
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with provided email already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      console.error("User already exists, try using other email");
      console.error(new ErrorHandler("User already exists", 400));
      return;
      // return next(new ErrorHandler("User already exists", 400));
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
      // Send activation email
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      // Respond with success message
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your Account`,
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
    expiresIn: "1d",
  });
};
//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!User) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        //console.error("User already exists");
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct password", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//load-user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
