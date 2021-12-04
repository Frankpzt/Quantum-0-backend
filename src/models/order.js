const { Schema, model, Types } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const schema = Schema({
    orderId: {
        type: String,
    },
    customerInformation: {
        type: {
            firstName: String,
            lastName: String,
            phoneNumber: String,
            email: String,
            driverLicenseNumber: String,
            address: String,
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    pickUpLocation: {
        type: String,
        required: true,
    },
    dropOffLocation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Types.Decimal128,
        required: true,
    },
    totalRent: Types.Decimal128,
    rentalCost: Types.Decimal128,
    moneyReceived: Boolean,
    vehicleId: {
        type: String,
        ref: "Vehicle",
    },
});

schema.pre("save", function (next) {
    this.orderId = uuidv4();
    next();
});

module.exports = model("Order", schema);
