const jwt = require("../utils/jwt");
const JWT = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    const email = req.headers.useremail;
    if (!authHeader || !email) {
        return res.status(401).json("Please login or signup");
    }
    const baseToken = authHeader.split(" ")
    const parsedToken = JSON.parse(baseToken[1])
    if (baseToken.length !== 2 && baseToken[0] !== "Bearer") {
        return res.status(401).json("unauthorized request due to tokens missing");
    }

    JWT.verify(parsedToken, jwt_key, async function (err) {
        if (err) {
            return res.status(401).json("token expires")
        }
        const verifyResult = jwt.VerifyToken(parsedToken);
        if (verifyResult.email) {
            return next();
        }
        return res.status(401).json("unauthorized Request");
    })
}
