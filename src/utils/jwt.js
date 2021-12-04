const jwt = require("jsonwebtoken");

const jwt_key = process.env.JWT_KEY;

function SignToken(payload) {
  return jwt.sign(payload, jwt_key, { expiresIn: "1h" });
}

function VerifyToken(token) {
  try {
    return jwt.verify(token, jwt_key);
  } catch (err) {
    return err;
  }
}

module.exports = {
  SignToken,
  VerifyToken,
};
