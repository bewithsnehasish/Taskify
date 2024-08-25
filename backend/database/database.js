require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGO_URL}`);
    if (response) {
      console.log("connected to mongodb");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
