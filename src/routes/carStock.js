const express = require('express');
const { getCarStock } = require('../controllers/carStock');
const router = express.Router();

router.get('/', getCarStock);

module.exports = router;