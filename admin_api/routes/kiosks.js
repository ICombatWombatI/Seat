const KiosksController = require("../controllers/kiosks");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//kiosks/getKiosks
router.get('/getkiosks',     asyncHandler(KiosksController.getKiosks()));

//kiosks/createKiosk
router.get('/createkiosk',  asyncHandler(KiosksController.createKiosk()));

//kiosks/deleteKiosk
router.post('/deletekiosk',  asyncHandler(KiosksController.deleteKiosk()));

//kiosks/updateKiosk
router.post('/updatekiosk',  asyncHandler(KiosksController.updateKiosk()));

module.exports = router;