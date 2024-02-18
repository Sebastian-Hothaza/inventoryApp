const Car = require('../models/car');
const Category = require('../models/category');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// HOMEPAGE
exports.index = asyncHandler(async (req, res, next) => {
    const [numCars, numCategories] = await Promise.all([Car.countDocuments({}).exec(), Category.countDocuments({}).exec()]);
    res.render('index', {title: "Car Inventory Home", numCars, numCategories})
})


// CREATE
exports.carCreate_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    res.render("car_form", {title: "Create a new Car", allCategories});
})

exports.carCreate_post = [
    // Validate and sanitize fields
    body("year", 'Year must be in range of 1900-2100').isInt({min: 1900, max: 2100}).escape(),
    body("make", "Make must not be empty").isLength({min: 1}).escape(),
    body("model", "Model must not be empty").isLength({min: 1}).escape(),
    body("stock", "Stock must be in range of 0-100").isInt({min:0, max:100}).escape(),
    body("category.*").escape(),

    // Process the request
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create new car object
        const car = new Car({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            stock: req.body.stock,
            category: req.body.category
        });

        if(!errors.isEmpty()){
            // There are errors. Render form again with sanitized values/errors messages.
            const allCategories = await Category.find().exec();
            res.render("car_form", {title: "Create a new Car", car, allCategories, errors:errors.array()});

        }else{
            // Form data is valid!

            // Check if we already have the same car in the DB, if we do, then just append the inventory to it
            const carExists = await Car.findOne({year: car.year, make: car.make, model: req.body.model, category: car.category});
            if (carExists){
                car._id=carExists._id; //Augment the created object to duplicate the existing objects ID field
                const updatedCar = await Car.findByIdAndUpdate(car._id, car, {});
                res.redirect(updatedCar.url);
            }else{
                await car.save();
                res.redirect(car.url);
            }
        }
    })
]


// READ
exports.carDetail = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.id).populate("category").exec();
    res.render("car_detail", {title: "Details about this car", car})
})
exports.carsDetail = asyncHandler(async (req, res, next) => {
    const allCars = await Car.find().populate("category").exec();
    res.render("car_list", {title: "Your cars", cars: allCars})
})


// UPDATE
exports.carUpdate_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    const car = await Car.findById(req.params.id).exec();

    if (car === null){
        const err = new Error("Car not found");
        err.status = 404;
        return next(err);
    }

    res.render("car_form", {title: "Edit Car", car, allCategories})
})
exports.carUpdate_post = [
        // Validate and sanitize fields
        body("year", 'Year must be in range of 1900-2100').isInt({min: 1900, max: 2100}).escape(),
        body("make", "Make must not be empty").isLength({min: 1}).escape(),
        body("model", "Model must not be empty").isLength({min: 1}).escape(),
        body("stock", "Stock must be in range of 0-100").isInt({min:0, max:100}).escape(),
        body("category.*").escape(),
    
        // Process the request
        asyncHandler(async (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
    
            // Create new car object
            const car = new Car({
                year: req.body.year,
                make: req.body.make,
                model: req.body.model,
                stock: req.body.stock,
                category: req.body.category,
                _id: req.params.id
            });
    
            if(!errors.isEmpty()){
                // There are errors. Render form again with sanitized values/errors messages.
                const allCategories = await Category.find().exec();
                res.render("car_form", {title: "Edit Car", car, allCategories, errors:errors.array()});
    
            }else{
                // Form data is valid! Update the recod
                await Car.findByIdAndUpdate(car._id, car, {});
                res.redirect(car.url);
            }
        })
]


// DELETE
exports.carDelete_get = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.id).exec();
    res.render("car_delete", {title: "Delete Car", car})
})
exports.carDelete_post = asyncHandler(async (req, res, next) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars')
})