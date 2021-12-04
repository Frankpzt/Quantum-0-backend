const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getUsersByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} = require("../controllers/usersHandler");
const authGuard = require("../middleware/authGuard");
const authValidate = require("../middleware/authValidator");

router.post("/", authValidate, addUser);
router.get("/", authGuard, getAllUsers);
router.get("/:id", authGuard, getUsersByEmail);
router.put("/", authGuard, updateUserByEmail);
router.delete("/:id", authGuard, deleteUserByEmail);

module.exports = router;
