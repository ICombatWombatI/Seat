const CategoriesController = require("../controllers/categories");
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const verifyToken = require('../middlewares/verifyToken');

//Categories/getCategories 
router.get('/getcategories',  asyncHandler(CategoriesController.getCategories()));

//categories/createCategory
router.get('/createcategory',  asyncHandler(CategoriesController.createCategory()));

//categories/deleteCategory
router.post('/deletecategory',  asyncHandler(CategoriesController.deleteCategory()));

//categories/updateCategory
router.post('/updatecategory',  asyncHandler(CategoriesController.updateCategory()));

module.exports = router;