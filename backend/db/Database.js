const mongoose = require("mongoose");

const connectDatabase = () => {
  if (!process.env.DB_URL) {
    console.error("DB_URL environment variable is not defined.");
    return; // Exit the function if DB_URL is not defined
  }

  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = connectDatabase;
