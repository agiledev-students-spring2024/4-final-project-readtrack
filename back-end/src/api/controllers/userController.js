const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// maybe use : const { validationResult } = require('express-validator');
// Function to hash passwords, consider moving to a utility file if used elsewhere
const saltRounds = 10;
async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

// register a user
exports.register = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
    res.status(201).json({
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error during registration.");
  }
};


// user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );
      return res.status(200).json({
        user: {
          _id: user._id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
        },
        token,
      });
    }
    res.status(401).json({ message: "Invalid credentials" });
  }
  catch (error) {
    res.status(500).send("Server error during login.");
  }
}

// logout controller
exports.logout = async (req, res) => {
  res.status(200).send("User logged out");
}

exports.updateUser = async (req, res) => {
  console.log("in update user")
  const { id } = req.params;
  const { fullname, username, email, bio } = req.body
  try {
    // find user and update it
    const updatedUser = await User.findByIdAndUpdate(id, { fullname, username, email, bio }, { new: true })
    if (!updatedUser) {
      return res.status(404).send("User not found")
    }
    updatedUser.password = undefined;
    res.status(200).json({ user: updatedUser });

  }
  catch (error) {
    console.error(error)
    res.status(500).send("error updating user")
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).send("User not found")
    }
    res.status(200).send("User deleted")
  }
  catch (error) {
    console.error(error)
    res.status(500).send("error deleting user")
  }
}

// get a user
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send("User not found")
    }
    user.password = undefined;
    res.status(200).json(user)
  }
  catch (error) {
    console.error(error)
    res.status(500).send("error getting user")
  }
}

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users)
  }
  catch (error) {
    console.error("Failed to retrieve users", error)
    res.status(500).send("Error retrieving users")
  }

}




