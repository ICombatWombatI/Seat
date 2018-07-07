const OrdersController = require("../controllers/orders");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//Stadiums/getStadiumss 
router.get('/getorders',  asyncHandler(OrdersController.getOrders()));

module.exports = router;