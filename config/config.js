const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecommercebackendtasks.uvjxc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Successfully Connected".cyan);
      });
  } catch (error) {
    console.log("Error connecting to Database");
    process.exit(1);
  }
};

module.exports = connectDB;
