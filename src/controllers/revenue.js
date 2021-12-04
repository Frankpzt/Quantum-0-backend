const Order = require('../models/order');
const dayjs = require('dayjs');

async function getTotalProfit(req,res){
    const order = await Order.find().exec();
    if(!order){
        return res.status(404).send("Revenue not found");
    }
    Order.aggregate([{
        $group: {
            _id: "$status",
            totalRevenue: { $sum: "$totalRent" },
            totalCost:{ $sum: "$rentalCost" }
        }} ],(e,result) => { 
    if(e){
        return res.status(404).send('Error')
    } 
    const profit = result[0].totalRevenue - result[0].totalCost;
    return res.status(200).json(profit);
})}

async function getMonthProfit(req,res){
    const date = dayjs();
    const currentTime = date.date(1).$d;
    const order = await Order.find().exec();
    if(!order){
        return res.status(404).send("Revenue not found");
    }
    const result = await Order.aggregate([
        {
        $match:{endDate:{$gte:currentTime}}
    },
        {
            $group: {
            _id: "$status",
            totalRevenue: { $sum: "$totalRent" },
            totalCost:{ $sum: "$rentalCost" }
        }
    }
])
    const monthProfit = result[0].totalRevenue - result[0].totalCost;
    return res.status(200).json(monthProfit);
    }

module.exports = {
    getTotalProfit,
    getMonthProfit
}