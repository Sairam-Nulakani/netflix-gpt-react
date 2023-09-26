const User = require("../models/user");
const router = require("express").Router();

module.exports = router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log(req.params);
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Email Verification Failed" });
  }
});
