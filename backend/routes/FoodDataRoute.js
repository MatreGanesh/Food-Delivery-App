const express = require('express');
const router = express.Router();
// const foodMenuController = require('../controllers/FoodMenuDataController');

const { createFoodItem, createCategoryItem, getFoodMenu, getFoodCategory } = require('../controllers/FoodMenuDataController')

const { registerValidator, userLogin } = require('../controllers/UserValidations/UserValidator')
const { registerUser, loginUser } = require('../controllers/UserController')

const { orderData, myOrderData } = require('../controllers/Orders');


//Post the food Items / Create Food Items - Fetching food items data
router.post('/add_menu', createFoodItem);
router.post('/add_category', createCategoryItem);
router.get('/all_menu', getFoodMenu);
router.get('/all_category', getFoodCategory);

// User Register/Login , also Apply validation middleware and then handle the request with the controller
router.post('/register', registerValidator, registerUser);
router.post('/login', userLogin, loginUser);

//Orderdata
router.post('/orderData', orderData)
router.post('/myOrderData', myOrderData)

module.exports = router;