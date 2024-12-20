// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");


// Middleware to parse JSON body
app.use(express.json());
app.use(cors());


async function connectToMongoDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

connectToMongoDB();

const reviewRoutes = require("./routes/review")
app.use('/', reviewRoutes);

const userRoutes = require("./routes/user")
app.use('/', userRoutes);

const studentRoutes = require("./routes/studentlist.js")
app.use('/', studentRoutes);

const emailRoutes = require('./routes/email');
app.use('/', emailRoutes);

const studentlistRoutes = require("./routes/studentlist")
app.use('/', studentlistRoutes);

const reviewlistRoutes = require("./routes/reviewlist")
app.use('/', reviewlistRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



