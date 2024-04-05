const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`mongodb connected with server: ${mongoose.connection.host}`);
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = connectDatabase;
