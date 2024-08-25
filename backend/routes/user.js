require("dotenv").config();
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Replace "fallback_secret_key" with a secure key or remove it for productio

// Signup Route for the User Model
// This route will check if the username or email already exists in the database and then create and new user
router.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ username });
    const userEmail = await User.findOne({ email });
    if (user || userEmail) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    } else if (username.length < 5 || username.length > 15) {
      return res
        .status(400)
        .json({ message: "Username must be between 5 and 15 characters long" });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login Route for the User Model
// This route will check if the username or email exists in the database and then check if the password is correct
router.post("/login", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "Username or email is required" });
  }

  if (username && (username.length < 5 || username.length > 15)) {
    return res
      .status(400)
      .json({ message: "Username must be between 5 and 15 characters long" });
  }

  try {
    let user;

    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Username or Password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload: user information to include in the token
      JWT_SECRET, // Secret key for signing the token
      { expiresIn: "1d" }, // Token expiration time
    );

    // Respond with a success message and the token
    return res.status(200).json({
      id: user._id,
      token, // Send the JWT token to the client
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
