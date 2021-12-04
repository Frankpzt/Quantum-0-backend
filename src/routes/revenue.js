const express = require('express');
const routes = express.Router();
const {
    getTotalProfit,
    getMonthProfit,
} = require('../controllers/revenue')

routes.get('/',getTotalProfit);
routes.get('/monthprofit',getMonthProfit);

module.exports = routes;