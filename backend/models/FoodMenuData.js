const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    size: {
        type: String,
        enum: ['half', 'full', 'regular', 'medium', 'large'] // add more like 'medium', 'large' if needed
    },
    price: {
        type: String,
        min: 0
    }
}, { _id: false });


const foodMenuDataSchema = new mongoose.Schema({
    category: {
        type: String, // or ref if using population
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    img: {
        type: String,
    },
    options: {
        type: [optionSchema],

    },
    description: {
        type: String,
    }
}, { timestamps: true });



module.exports = mongoose.model('foodMenuData', foodMenuDataSchema);

