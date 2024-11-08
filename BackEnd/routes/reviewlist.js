const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');


router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find(); // Retrieve all reviews from the database
        res.status(200).json(reviews); // Send the reviews as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
