const { body } = require('express-validator');
const userSchema = require('../../models/User');

const registerValidator = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

    body('email')
        .isEmail().withMessage('Must be a valid email')
        .custom(async (email) => {
            const existingUser = await userSchema.findOne({ email });
            if (existingUser) {
                throw new Error('Email is already registered!')
            }
        }),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

const userLogin = [
    body('email')
        .isEmail().withMessage('Must be a valid email'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

module.exports = { registerValidator, userLogin };