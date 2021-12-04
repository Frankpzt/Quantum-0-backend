const Order = require("../models/order");

async function getAllOrders(req, res) {
    const orders = await Order.find().exec();
    if (!orders) {
        return res.status(404).send("Order not found");
    }
    return res.status(200).json(orders);
}

async function addOrder(req, res) {
    const {
        startDate,
        endDate,
        pickUpLocation,
        dropOffLocation,
        status,
        rentPerDay,
        rentalCost,
        vehicleId
    } = req.body;
    if (
        !startDate ||
        !endDate ||
        !pickUpLocation ||
        !dropOffLocation ||
        !status ||
        rentPerDay === null ||
        rentalCost === null ||
        !vehicleId
    ) {
        return res.status(403).send("Required type missing.");
    }
    const order = new Order({
        startDate,
        endDate,
        pickUpLocation,
        dropOffLocation,
        status,
        rentPerDay,
        rentalCost,
        vehicleId
    });

    await order.save();
    return res.status(201).json(order);
}

async function getOrderById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(403).send("Id missing");
    }
    const order = await Order.findOne({ orderId: id }).exec();
    if (!order) {
        return res.status(404).send("no content");
    }
    return res.status(200).json(order);
}

async function getOrdersByIds(req, res) {
    const { ids } = req.body;
    if (ids.length === 0) {
        return res.status(403).send("id missing");
    }
    const orders = [];
    for (let id of ids) {
        const order = await Order.findOne({ orderId: id }).exec();
        if (!order) {
            return res.status(403).send("invalid id");
        }
        orders.push(order);
    }
    return res.status(200).json({ orders });
}

async function updateOrderById(req, res) {
    const { id } = req.params;
    const {
        startDate,
        endDate,
        pickUpLocation,
        dropOffLocation,
        status,
        rentPerDay,
    } = req.body;
    const order = await Order.findOneAndUpdate(
        { orderId: id },
        {
            $set: {
                startDate,
                endDate,
                pickUpLocation,
                dropOffLocation,
                status,
                rentPerDay,
            },
        },
        { new: true }
    ).exec();
    if (!order) {
        return res.status(404).send("no content");
    }
    return res.status(200).json(order);
}

async function deleteOrderById(req, res) {
    const { id } = req.params;
    const order = await Order.findOneAndDelete({ orderId: id }).exec();
    if (!order) {
        return res.status(404).send("no content");
    }
    return res.status(200).send(id);
}

module.exports = {
    getAllOrders,
    addOrder,
    getOrderById,
    getOrdersByIds,
    updateOrderById,
    deleteOrderById,
};
