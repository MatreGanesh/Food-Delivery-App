// models/FoodCategory.js
const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('FoodCategory', foodCategorySchema);
