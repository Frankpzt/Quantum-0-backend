const express = require("express");
const {
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
} = require("../controllers/vehicle");

const router = express.Router();

router.post("", addVehicle);
router.get("/plate/:plate", getVehicleByPlate);
router.get("/plateToId/:plate", getVehicleIdByPlate);
router.get("", getAllVehicles);
router.put("/plate/:plate", updateVehicleByPlate);
router.delete("/plate/:plate", deleteVehicleByPlate);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicleById);
router.delete("/:id", deleteVehicleById);
router.post("/multiple", getVehiclesByIds);
router.put("/accidentRecord/:id", createAccidentRecordById);
router.put("/periodicCost/:id", addPeriodicCostById);

module.exports = router;
