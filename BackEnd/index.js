// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();




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
connectToMongoDB();
