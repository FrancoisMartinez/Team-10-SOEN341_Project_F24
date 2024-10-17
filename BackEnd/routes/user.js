const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const { email, password, instructor } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email, instructor });
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ error: " not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            console.log("Invalid password");
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, instructor: existingUser.instructor },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '2h' }
        );

        // Return user info and token
        return res.status(200).json({
            user: {
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                instructor: existingUser.instructor,
            },
            token
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;