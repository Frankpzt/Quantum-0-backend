const Vehicle = require("../models/vehicle");

async function getAllVehicles(req, res) {
    const vehicles = await Vehicle.find().exec();
    if (!vehicles) {
        return res.status(404).send("Not found any vehicle");
    }
    return res.status(200).json(vehicles);
}

async function addVehicle(req, res) {
    const {
        plate,
        make,
        registerNumber,
        year,
        miles,
        collectedDate,
        body,
        color,
        seats,
        transmission,
        totalRentDay,
        dailyRent,
        cost,
        rented,
        orderId,
        periodicCost,
        accidentRecord,
    } = req.body;
    console.log(plate);
    if (!plate || !make || !registerNumber) {
        return res.status(403).send("Required type missing.");
    }
    if (plate.length > 7) {
        return res.status(403).send("Invalid plate");
    }
    const existingVehicle = await Vehicle.findOne({ plate });
    if (existingVehicle) {
        return res.status(403).send("Vehicle exists already.");
    }
    const vehicle = new Vehicle({
        plate,
        make,
        registerNumber,
        year,
        miles,
        collectedDate,
        body,
        color,
        seats,
        transmission,
        totalRentDay,
        dailyRent,
        cost,
        rented,
        orderId,
        periodicCost,
        accidentRecord,
    });

    await vehicle.save();
    return res.status(201).json(vehicle);
}

async function getVehicleByPlate(req, res) {
    const { plate } = req.params;
    if (!plate) {
        return res.status(403).send("Plate missing.");
    }
    if (plate.length > 7) {
        return res.status(403).send("Invalid plate");
    }
    const vehicle = await Vehicle.findOne({ plate: plate }).exec();
    if (!vehicle) {
        return res.sendStatus(204);
    }
    return res.status(200).json(vehicle);
}

async function getVehicleIdByPlate(req, res) {
    const { plate } = req.params;
    if (!plate) {
        return res.status(403).send("Plate missing.");
    }
    if (plate.length > 7) {
        return res.status(403).send("Invalid plate");
    }
    const vehicle = await Vehicle.findOne({ plate: plate }).exec();
    if (!vehicle) {
        return res.sendStatus(204);
    }
    return res.status(200).send(vehicle.vehicleId);
}

async function updateVehicleByPlate(req, res) {
    const { plate } = req.params;
    const { make, registerNumber, year, miles, collectedDate } = req.body;
    const vehicle = await Vehicle.findOneAndUpdate(
        { plate: plate },
        {
            $set: {
                make,
                registerNumber,
                year,
                miles,
                collectedDate,
            },
        },
        { new: true }
    ).exec();
    if (!vehicle) {
        return res.status(404).send("The vehicle not found.");
    }
    return res.status(200).json(vehicle);
}

async function deleteVehicleByPlate(req, res) {
    const { plate } = req.params;
    const vehicle = await Vehicle.findOneAndDelete({ plate: plate }).exec();
    if (!vehicle) {
        return res.status(404).send("The vehicle not found.");
    }
    return res.status(200).send(plate);
}

async function getVehicleById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(403).send("Id missing.");
    }
    const vehicle = await Vehicle.findOne({ vehicleId: id }).exec();
    if (!vehicle) {
        return res.status(404).send("no content");
    }
    return res.status(200).json(vehicle);
}

async function getVehiclesByIds(req, res) {
    const { ids } = req.body;
    if (ids.length === 0) {
        return res.status(403).send("id missing");
    }
    const vehicles = [];
    for (let id of ids) {
        const vehicle = await Vehicle.findOne({ vehicleId: id }).exec();
        if (!vehicle) {
            return res.status(403).send("invalid id");
        }
        vehicles.push(vehicle);
    }
    return res.status(200).json({ vehicles });
}

async function updateVehicleById(req, res) {
    const { id } = req.params;
    const { plate, make, registerNumber, year, miles, collectedDate } =
        req.body;
    const vehicle = await Vehicle.findOne({ plate }).exec();
    if (!vehicle) {
        return res.status(403).send("vehicle does not exists");
    }

    vehicle = await Vehicle.findOneAndUpdate(
        { vehicleId: id },
        {
            $set: {
                plate,
                make,
                registerNumber,
                year,
                miles,
                collectedDate,
            },
        },
        { new: true }
    ).exec();
    if (!vehicle) {
        return res.status(404).send("The vehicle not found.");
    }
    return res.status(200).json(vehicle);
}

async function deleteVehicleById(req, res) {
    const { id } = req.params;
    const vehicle = await Vehicle.findOneAndDelete({ vehicleId: id }).exec();
    if (!vehicle) {
        return res.status(404).send("The vehicle not found.");
    }
    return res.status(200).send(plate);
}

async function createAccidentRecordById(req, res) {
    const { id } = req.params;
    const { accidentRecord }  = req.body;
    if(accidentRecord.cost === "") {
        return res.status(400).send("You must specify a cost value, it can be 0");
    } else {
        const vehicle = await Vehicle.findOneAndUpdate(
            { vehicleId: id },
            {
                $push: {accidentRecord: accidentRecord},
            },
            { new: true }
        ).exec();
    
        if (!vehicle) {
            return res.status(404).send("The vehicle is not found.");
        }
        return res.status(200).json(vehicle);
    }
}

async function addPeriodicCostById(req, res) {
    const { id } = req.params;
    const { periodicCost } = req.body;
    if (periodicCost.cost === "" 
        || periodicCost.periodicType === "" 
        || periodicCost.date === "" 
        || periodicCost.nextPaymentTime === "") 
        return res.status(400).send("Form values can't be empty.")

    const vehicle = await Vehicle.findOneAndUpdate(
        { vehicleId: id }, 
        {
            $push: {periodicCost: periodicCost},
        },
        { new: true }
    ).exec();
    if (!vehicle) {
        return res.status(404).send("The vehicle is not found.");
    }
    return res.status(202).json(vehicle);
}

module.exports = {
    getAllVehicles,
    addVehicle,
    getVehicleByPlate,
    updateVehicleByPlate,
    deleteVehicleByPlate,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById,
    getVehiclesByIds,
    createAccidentRecordById,
    addPeriodicCostById,
    getVehicleIdByPlate
};
