const Car = require('../models/car');
const Category = require('../models/category');

const asyncHandler = require("express-async-handler");

// HOMEPAGE
exports.index = asyncHandler(async (req, res, next) => {
    const [numCars, numCategories] = await Promise.all([Car.countDocuments({}).exec(), Category.countDocuments({}).exec()]);
    res.render('index', {title: "Car Inventory Home", numCars, numCategories})
})


// CREATE
exports.carCreate_get = asyncHandler(async (req, res, next) => {
    res.send("carCreate_get not yet implemented!")
})
exports.carCreate_post = asyncHandler(async (req, res, next) => {
    res.send("carCreate_post not yet implemented!")
})


// READ
exports.carDetail = asyncHandler(async (req, res, next) => {
    res.send("carDetail not yet implemented!")
})
exports.carsDetail = asyncHandler(async (req, res, next) => {
    res.send("carsDetail not yet implemented!")
})


// UPDATE
exports.carUpdate_get = asyncHandler(async (req, res, next) => {
    res.send("carUpdate_get not yet implemented!")
})
exports.carUpdate_post = asyncHandler(async (req, res, next) => {
    res.send("carUpdate_post not yet implemented!")
})


// DELETE
exports.carDelete_get = asyncHandler(async (req, res, next) => {
    res.send("carDelete_get not yet implemented!")
})
exports.carDelete_post = asyncHandler(async (req, res, next) => {
    res.send("carDelete_post not yet implemented!")
})