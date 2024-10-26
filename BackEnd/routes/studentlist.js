const express = require('express');
const router = express.Router();
const User = require('../models/user');


// setup const students to only retrieve students that have the instructor field = false

router.get('/students', async (req, res) => {
    try {
        const students = await User.find({ instructor: false }); // Retrieve all students from the database
        console.log(students);
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
