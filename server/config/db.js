const mongoose = require("mongoose");
require("dotenv").config(); // Ensure the environment variables are loaded

exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error);
      process.exit(1); // Exit the process if the connection fails
    });
};
