const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');

// Route to get reviews for a specific student by email
router.get('/reviews/:email', async (req, res) => {
    const studentEmail = req.params.email; // Get the email from the URL parameter

    try {
        // Find reviews for the student with the provided email
        const reviews = await Review.find({ studentEmail }).sort({ createdAt: -1 }); // Sorted by date of creation
        res.status(200).json(reviews); // Send filtered reviews as JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
