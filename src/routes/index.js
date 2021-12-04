const express = require("express");
const vehicleRouter = require("./vehicle");
const orderRouter = require("./order");
const usersRouter = require("./users");
const loginRouter = require("../controllers/logIn");
const taskRouter = require("./task");
const revenueRouter = require("./revenue");
const carStockRouter = require("./carStock");

const router = express.Router();

router.post("/login", loginRouter);
router.use("/users", usersRouter);
router.use("/vehicle", vehicleRouter);
router.use("/order", orderRouter);
router.use("/task", taskRouter);
router.use("/revenue", revenueRouter);
router.use("/stock", carStockRouter);

module.exports = router;
