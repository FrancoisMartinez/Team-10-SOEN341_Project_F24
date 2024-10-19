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

const userRoutes = require("./routes/user")
app.use('/', userRoutes);
const studentRoutes = require("./routes/students")
app.use('/', studentRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


