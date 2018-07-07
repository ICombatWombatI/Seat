const StadiumsController = require("../controllers/stadiums");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//Stadiums/getStadiumss 
router.get('/getstadiums',  asyncHandler(StadiumsController.getStadiums()));

//Stadiums/StadiumssCount 
router.get('/getstadiumscount',  asyncHandler(StadiumsController.getStadiumsCount()));

//Stadiums/StadiumById
router.get('/getstadiumbyid',  asyncHandler(StadiumsController.getStadiumById()));

//Stadiumss/createStadiums
router.post('/createstadium',  asyncHandler(StadiumsController.createStadium()));

//Stadiums/deleteStadiums
router.post('/deletestadium',  asyncHandler(StadiumsController.deleteStadium()));

//Stadiums/updateStadiums
router.post('/updatestadium',  asyncHandler(StadiumsController.updateStadium()));

module.exports = router;