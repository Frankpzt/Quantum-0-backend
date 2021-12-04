const User = require("../models/user");
const jwt = require("../utils/jwt");
const { comparePassword } = require("../utils/passwordHandler")

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json("Email or password is missing");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json("User not found. Please sign up!");
  }
  if (!(await comparePassword(password, user.password))) {
    return res.status(403).json("Wrong password. Please try again");
  }
  const token = await jwt.SignToken({ email: email });
  res.setHeader("Access-Control-Expose-Headers", "authorization");
  res.setHeader("authorization", token);
  return res.status(200).json({ user });
};
