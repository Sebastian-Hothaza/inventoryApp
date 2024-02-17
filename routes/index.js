const express = require('express');
const router = express.Router();

// Require controller modules.
const carController = require('../controllers/carController');
const categoryController = require('../controllers/categoryController')


// CAR ROUTES

/* GET home page. */
router.get('/', carController.index);

// GET request for creating a car
router.get('/car/create', carController.carCreate_get);
// POST request for creating a car
router.post('/car/create', carController.carCreate_post);

// GET request for viewing a car
router.get('/car/:id', carController.carDetail);
// GET request for viewing all cars
router.get('/cars', carController.carsDetail);
router.get('/car', (req, res, next) => res.redirect('/cars'));

// GET request for updating a car
router.get('/car/:id/update', carController.carUpdate_get);
// POST request for updating a car
router.post('/car/:id/update', carController.carUpdate_post);

// GET request for deleting a car
router.get('/car/:id/delete', carController.carDelete_get);
// POST request for updating a car
router.post('/car/:id/delete', carController.carDelete_post);


// CATEGORY ROUTES


// GET request for creating a category
router.get('/category/create', categoryController.categoryCreate_get);
// POST request for creating a category
router.post('/category/create', categoryController.categoryCreate_post);

// GET request for viewing a category
router.get('/category/:id', categoryController.categoryDetail);
// GET request for viewing all category
router.get('/categories', categoryController.categoriesDetail);
router.get('/category', (req, res, next) => res.redirect('/categories'));

// GET request for updating a category
router.get('/category/:id/update', categoryController.categoryUpdate_get);
// POST request for updating a category
router.post('/category/:id/update', categoryController.categoryUpdate_post);

// GET request for deleting a category
router.get('/category/:id/delete', categoryController.categoryDelete_get);
// POST request for deleting a category
router.post('/category/:id/delete', categoryController.categoryDelete_post);

module.exports = router;
