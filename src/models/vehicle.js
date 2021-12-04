const { Schema, model, Types, now } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
// add
const schema = new Schema({
    vehicleId: String,
    plate: {
        type: String,
        required: true,
        unique: true,
    },
    make: {
        type: String,
        required: true,
    },
    registerNumber: {
        type: String,
        required: true,
    },
    year: Number,
    miles: Types.Decimal128,
    collectedDate: {
        type: Date,
        default: now,
    },
    body: String,
    color: String,
    seats: Number,
    transmission: String,
    totalRentDay: Number,
    dailyRent: Types.Decimal128,
    cost: Types.Decimal128,
    rented: Boolean,
    orderId: [
        {
            type: String,
            ref: "Order",
        },
    ],
    periodicCost: [
        {
            periodicType: String,
            cost: Types.Decimal128,
            date: Date,
            nextPaymentTime: Date,
        },
    ],
    accidentRecord: [
        {
            time: Date,
            location: String,
            cost: Types.Decimal128,
            responsible: String,
            insurance: String,
            relatedOrder: String,
            description: String,
        },
    ],
});

schema.pre("save", function (next) {
    this.vehicleId = uuidv4();
    next();
});

module.exports = model("Vehicle", schema);
