const User = require("../models/user");
const jwt = require("../utils/jwt");
const md5 = require("md5");
const { hashPassword, comparePassword } = require("../utils/passwordHandler");

async function addUser(req, res) {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const hashedEmail = md5(email);
    const avatar = `http://gravatar.com/avatar/${hashedEmail}?d=identicon`;
    const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        avatar,
    });

    await user.save();
    const accessToken = await jwt.SignToken({ email: email });
    res.setHeader("Access-Control-Expose-Headers", "authorization");
    res.setHeader("authorization", ` ${accessToken}`);
    return res.status(201).json({ user });
}

async function getAllUsers(req, res) {
    try {
        const user = await User.find().lean().exec();
        res.status(200).json(user);
    } catch (err) {
        res.status(403).json(`${err} Failed to get all users`);
    }
}

async function getUsersByEmail(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(403).json("User email is needed");
    }
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return res.status(403).json("User not found");
    }
    return res.status(200).json({ user });
}

async function updateUserByEmail(req, res) {
    const {
        firstname,
        lastname,
        email,
        currentPassword,
        newPassword,
        phoneNumber,
    } = req.body;
    if (!email || !newPassword || !firstname || !lastname || !currentPassword) {
        return res.status(403).json("User information is not fully provided");
    }
    const checkUser = await User.findOne({ email: email }).exec();
    if (!checkUser) {
        return res.status(403).json("User not found");
    }
    if (!(await comparePassword(currentPassword, checkUser.password))) {
        return res.status(403).json("Wrong current password. Please try again");
    }
    const hashedPassword = await hashPassword(newPassword);
    //set {new: true},returns the document after update was applied.
    const user = await User.findOneAndUpdate(
        { email: email },
        { firstname, lastname, email, password: hashedPassword, phoneNumber },
        { new: true }
    ).exec();
    return res.status(201).json({ user });
}

async function deleteUserByEmail(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(403).json("User email is needed");
    }
    const checkUser = await User.findOne({ email: email }).exec();
    if (!checkUser) {
        return res.status(403).json("User not found");
    }
    const user = await User.findOneAndDelete({ email: email }).exec();
    return res.status(200).json(`${user} \n has been deleted`);
}

module.exports = {
    addUser,
    getUsersByEmail,
    getAllUsers,
    updateUserByEmail,
    deleteUserByEmail,
};
