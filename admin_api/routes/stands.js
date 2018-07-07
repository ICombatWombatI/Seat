const StandsController = require("../controllers/stands");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//Stadiums/getStadiumss 
router.get('/getstands',  asyncHandler(StandsController.getStands()));

//Stadiumss/createStadiums
router.post('/createstand',  asyncHandler(StandsController.createStand()));

//Stadiums/deleteStadiums
router.post('/deletestand',  asyncHandler(StandsController.deleteStand()));

//Stadiums/updateStadiums
router.post('/updatestand',  asyncHandler(StandsController.updateStand()));

module.exports = router;