import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Register User Function
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: createdUser.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





export { registerUser, loginUser };