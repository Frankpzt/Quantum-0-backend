const Vehicle = require('../models/vehicle');

async function getCarStock(req,res){
    const vehicles = await Vehicle.find().exec();
    if(!vehicles){
        return res.status(404).send("Vehicle is not exist.");
    }
    let carStock = 0;
    vehicles.forEach((item)=>{
        if(!item.rented){
            carStock++;
        }
    });
    return res.status(200).json(carStock);
}

module.exports = { getCarStock };