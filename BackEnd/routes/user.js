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
            return res.status(409).json({ error: "User with this email already exists" });
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
            teams: null,
        });

        // Respond with success
        return res.status(200).json({ status: "Success" });

    } catch (err) {
        console.log('Error creating user:', err);
        return res.status(500).json({ error: "Internal Server Error" });
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
            return res.status(404).json({ error: (instructor ? 'Instructor' : ' Student') + " not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            console.log("Invalid password");
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate Access Token


        // Generate Refresh Token
        

        // Return user info and token
        return res.status(200).json({
            user: {
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                instructor: existingUser.instructor,
                teams : existingUser.teams
            },
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete student for tests
router.post('/deleteStudent', async (req, res) => {
    try {
        const { email } = req.body; // Extract email and password

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user
        await User.deleteOne({ email });
        return res.status(200).json({ status: "User deleted successfully" });

    } catch (err) {
        console.log('Error creating user:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// Add team route (only for instructors)
router.post('/add-team', async (req, res) => {
    try {
        const { members, teamName, instructor } = req.body;

        // Ensure only instructors can add teams
        if (!instructor) {
            return res.status(403).json({ error: "Only instructors can add teams" });
        }
        const existingTeam = await User.findOne({ teams: teamName });
        if (existingTeam) {
            return res.status(400).json({ error: "Team name already exists" });
        }

        // Find the user by email
        // Iterate over each member and update their team field
        const updatePromises = members.map(async (member) => {
            const user = await User.findOne({ email : member.email });
            if (user) {
                user.teams = teamName;
                await user.save();
            }
        });

        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Team added successfully" });
    } catch (err) {
        console.error('Error adding team:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/update-team', async (req, res) => {
    try {
        const { members, teamName, instructor } = req.body;

        // Ensure only instructors can add teams
        if (!instructor) {
            return res.status(403).json({ error: "Only instructors can add teams" });
        }

        // Find the user by email
        // Iterate over each member and update their team field
        const updatePromises = members.map(async (member) => {
            const user = await User.findOne({ email : member.email });
            if (user) {
                user.teams = teamName;
                await user.save();
            }
        });

        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Team updated successfully" });
    } catch (err) {
        console.error('Error adding team:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;