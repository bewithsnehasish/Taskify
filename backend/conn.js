const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect("");
    if (response) {
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.log(err);
  }
};
