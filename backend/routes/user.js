const User = require("../models/user");
const router = require("express").Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
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

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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

    // Compare provided password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
