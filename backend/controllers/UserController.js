const { validationResult } = require('express-validator');
const userSchema = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    try {
        console.log('Heyy! User!')
        // Check validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        // If validation passes, process the request
        const { username, email, password, geoLocation } = req.body;
        console.log(username, email, password, geoLocation);

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: [{ msg: 'Email is already registered!' }] });
        }

        //Encrypt the password to secure
        const salt = await bcrypt.genSalt(10);
        let securPass = await bcrypt.hash(password, salt);

        const user = new userSchema({
            username, email, password: securPass, geoLocation
        })

        const userData = await user.save();

        //To securly Show the user Data which render on frontend
        const { password: _, ...safeUser } = userData._doc;

        // Simulate user registration logic (e.g., saving to a database)
        return res.status(200).json({ success: true, message: 'User registered successfully!', user: safeUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}


const loginUser = async (req, res) => {
    try {
        console.log('Heyy! Login User!')

        // Check validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        console.log(email, password);

        // 1. Find the user by email
        const user = await userSchema.findOne({ email });

        // 2. If user is not found, return error
        if (!user) {
            return res.status(400).json({ success: false, errors: [{ msg: 'Invalid Credentials!' }] });
        }

        //Match the password using (bcrypt.compare)
        const passMatch = await bcrypt.compare(password, user.password);

        // 3. If password is wrong, return error
        if (!passMatch) {
            return res.status(400).json({ success: false, errors: [{ msg: 'Invalid Credentials!' }] });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);

        // Simulate user registration logic (e.g., saving to a database)
        return res.status(200).json({ success: true, message: 'User logged-in successfully!', authToken: authToken });

    } catch (error) {
        return res.status(404).json({ success: false, message: `Server Error : ${error}` });
    }
}

module.exports = { registerUser, loginUser };