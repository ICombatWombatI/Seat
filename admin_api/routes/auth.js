var AuthController = require("../controllers/auth");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//auth/authorization
router.post('/authorization',  asyncHandler(AuthController.auth()));

//auth/password
router.post('/password',
    verifyToken,
    asyncHandler(AuthController.changePassword())
);

//user/register
router.post('/register',
    asyncHandler(AuthController.register())
);
module.exports = router;