const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


// Sign-up route
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, instructor } = req.body; // Extract email and password

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send("User with this email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            instructor: instructor,
        });

        // Respond with success
        return res.status(200).json({ status: "Success", user: user });

    } catch (err) {
        console.log('Error creating user:', err);
        return res.status(500).send("Internal Server Error");
    }
});


// Login route (example for checking login info)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (isPasswordMatch) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).send("Invalid password");
        }

    } catch (err) {
        console.log('Error during login:', err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;