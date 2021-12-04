const express = require("express");
const {
    getAllOrders,
    addOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    getOrdersByIds,
} = require("../controllers/order");
const router = express.Router();

router.get("/", getAllOrders);
router.post("/", addOrder);
router.get("/:id", getOrderById);
router.post("/multiple", getOrdersByIds);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
