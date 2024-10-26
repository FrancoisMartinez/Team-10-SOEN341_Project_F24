const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// setup const students to only retrieve students that have the instructor field = false

router.get('/students', async (req, res) => {
    try {
        const students = await User.find(); // Retrieve all students from the database
        res.json(students); // Send the students as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
