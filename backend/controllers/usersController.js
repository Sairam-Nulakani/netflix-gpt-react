const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, mobilenumber } = req.body;
      const exist = await User.findOne({ email });
      if (exist) {
        return res.status(400).json("Already registered with this email");
      }
      const newUser = new User({ name, email, password, mobilenumber });
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
      await newUser.save();
      const { __v, createdAt, ...userData } = newUser._doc;
      res.status(200).json(userData);
    } catch (err) {
      return res.status(500).json("Failed to Register");
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("No User with given credentials");
      }
      if (user.password !== password) {
        return res.status(401).json("Wrong Password");
      }
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: "Failed to log in" });
    }
  },
};
