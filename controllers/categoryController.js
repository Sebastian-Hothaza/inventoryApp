const Category = require('../models/category');

const asyncHandler = require("express-async-handler");

// CREATE
exports.categoryCreate_get = asyncHandler(async (req, res, next) => {
    res.send("categoryCreate_get not yet implemented!")
})
exports.categoryCreate_post = asyncHandler(async (req, res, next) => {
    res.send("categoryCreate_post not yet implemented!")
})

// READ
exports.categoryDetail = asyncHandler(async (req, res, next) => {
    res.send("categoryDetail not yet implemented!")
})
exports.categoriesDetail = asyncHandler(async (req, res, next) => {
    res.send("categoryDetails not yet implemented!")
})

// UPDATE
exports.categoryUpdate_get = asyncHandler(async (req, res, next) => {
    res.send("categoryUpdate_get not yet implemented!")
})
exports.categoryUpdate_post = asyncHandler(async (req, res, next) => {
    res.send("categoryUpdate_post not yet implemented!")
})

// DELETE
exports.categoryDelete_get = asyncHandler(async (req, res, next) => {
    res.send("categoryDelete_get not yet implemented!")
})
exports.categoryDelete_post = asyncHandler(async (req, res, next) => {
    res.send("categoryDelete_get not yet implemented!")
})