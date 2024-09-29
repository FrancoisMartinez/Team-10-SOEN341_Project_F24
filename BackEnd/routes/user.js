const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();



// API endpoint to handle user registration
router.post('/signup', async (req, res) => {

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const existingUser = await User.findOne({ name: req.body.email });
        if (existingUser) {
            return res.status(409).send("User with this email already exists");
        }
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            balance: 5000
        });
        return res.status(200).json({ status: "Success" });

    } catch (err) {
        if (err?.keyPattern?.email) {
            return res.status(409).send("Email already exists");
        }
    }
});

module.exports = router;

