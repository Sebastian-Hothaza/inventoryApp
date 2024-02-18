const Category = require('../models/category');
const Car = require('../models/car');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// CREATE
exports.categoryCreate_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {title: "Create a new Category"})
})
exports.categoryCreate_post = [
        // Validate and sanitize fields
        body("name", "Name must not be empty").isLength({min: 1}).escape(),
        body("commercial.*").escape(),
        
        // Process the request
        asyncHandler(async (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
    
   
            // Create new category object
            const isCommercial = req.body.commercial===undefined? false:true; 
            const category = new Category({
                name: req.body.name,
                commercial: isCommercial,
            });
    
            if(!errors.isEmpty()){
                // There are errors. Render form again with sanitized values/errors messages.
                res.render("category_form", {title: "Create a new Category", category, errors:errors.array()});
    
            }else{
                // Form data is valid!
    
                // Check if we already have the same category in the DB
                const categoryExists = await Category.findOne({name: category.name, commercial: category.commercial});
                if (categoryExists){
                    res.redirect(categoryExists.url);
                }else{
                    await category.save();
                    res.redirect(category.url);
                }
            }
        })
]

// READ
exports.categoryDetail = asyncHandler(async (req, res, next) => {
    const [category, cars] = await Promise.all([Category.findById(req.params.id).exec(), Car.find({category: req.params.id})]);
    res.render("category_detail", {title: "Details about this Category", category, cars})
})

exports.categoriesDetail = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    res.render("category_list", {title: "Categories", categories: allCategories})
})

// UPDATE
exports.categoryUpdate_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render("category_form", {title: "Edit a Category", category})
})
exports.categoryUpdate_post = [
    // Validate and sanitize fields
    body("name", "Name must not be empty").isLength({min: 1}).escape(),
    body("commercial.*").escape(),
    
    // Process the request
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);


        // Create new category object
        const isCommercial = req.body.commercial===undefined? false:true; 
        const category = new Category({
            name: req.body.name,
            commercial: isCommercial,
            _id: req.params.id
        });

        if(!errors.isEmpty()){
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("category_form", {title: "Edit a Category", category, errors:errors.array()});

        }else{
            // Form data is valid! Update the member
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {})
            res.redirect(updatedCategory.url);
        }
    })
]

// DELETE
exports.categoryDelete_get = asyncHandler(async (req, res, next) => {
    res.send("categoryDelete_get not yet implemented!")
})
exports.categoryDelete_post = asyncHandler(async (req, res, next) => {
    res.send("categoryDelete_get not yet implemented!")
})