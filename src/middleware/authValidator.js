const Joi = require("joi");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    if (!email || !password || !firstname || !lastname){
        return res.status(403).json("User information is not fully provided")
    }
    if (!Joi.string().email().validate(email).error === false) {
        return res.status(403).json("Invalid email format")
    }

    if (!Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/).validate(password).error === false) {
        return res.status(403).json("Invalid password format. Your passwod needs to be eight characters at minimum , at least one uppercase letter, one lowercase letter, one number and one special character")
    }

    const existingUser = await User.findOne({email: email}).exec()
    if (!existingUser) {
        return next();
    }
    return res.status(403).json("User already exists")
}