// Import necessary modules
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/user');



// Middleware to parse JSON body
app.use(express.json());
app.use(cors());


const userRoutes = require("./routes/User")
const mongoose = require("mongoose");
app.use('/', userRoutes);


// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

async function connectToMongoDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

async function checkLoginInfo() {
    await connectToMongoDB();

    const hardcodedEmail = 'varun.raval02@gmail.com';
    const hardcodedPassword = 'test1243';  // Hardcoded password for testing

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email: hardcodedEmail });
        if (!existingUser) {
            console.log('User does not exist:', hardcodedEmail);
            return;
        }

        // Compare the hardcoded password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(hardcodedPassword, existingUser.password);
        if (isPasswordMatch) {
            console.log('Login successful for user:', existingUser.email);
        } else {
            console.log('Invalid password for user:', existingUser.email);
        }

    } catch (err) {
        console.log('Error checking login info:', err);
    }
}

async function signUpTo() {
    await connectToMongoDB();

    const hardcodedEmail = 'varun.raval02@gmail.com';
    const hardcodedPassword = 'test123';  // You can test with this, but in reality, you should hash the password

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: hardcodedEmail });
        if (existingUser) {
            console.log('User already exists:', existingUser.email);
            return;
        }

        // Hash the hardcoded password
        const hashedPassword = await bcrypt.hash(hardcodedPassword, 10);

        // Create the user
        const user = await User.create({
            email: hardcodedEmail,
            password: hashedPassword,
            balance: 5000  // Example balance, you can modify this as needed
        });

        console.log('User created successfully:', user);

    } catch (err) {
        console.log('Error creating user:', err);
    }
}

connectToMongoDB();
checkLoginInfo();
signUpTo();