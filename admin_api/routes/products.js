const ProductsController = require("../controllers/products");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//Products/getProducts 
router.get('/getproducts',  asyncHandler(ProductsController.getProducts()));

//Products/getProductsCount createProduct deleteProduct
router.get('/getproductscount',  asyncHandler(ProductsController.getProductsCount()));

//Products/getProductById
router.get('/getproductbyid',  asyncHandler(ProductsController.getProductById()));

//Products/createProduct
router.post('/createproduct',  asyncHandler(ProductsController.createProduct()));

//Products/deleteProduct
router.post('/deleteproduct',  asyncHandler(ProductsController.deleteProduct()));

//Products/updateProduct
router.post('/updateproduct',  asyncHandler(ProductsController.updateProduct()));

module.exports = router;