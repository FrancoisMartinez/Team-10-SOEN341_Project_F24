const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');

router.post('/reviewSubmission', async (req, res) => {
    console.log('test')

    const { ratings, comments } = req.body;

    try {
        const reviews = await Review.create({
            CooperationRating: ratings['Cooperation'],
            ConceptualContributionRating: ratings['Conceptual Contribution'],
            PracticalContributionRating: ratings['Practical Contribution'],
            WorkEthicRating: ratings['Work Ethic'],
            CooperationComment: comments['Cooperation'] || '',
            ConceptualContributionComment: comments['Conceptual Contribution'] || '',
            PracticalContributionComment: comments['Practical Contribution'] || '',
            WorkEthicComment: comments['Work Ethic'] || '',
        });

        return res.status(200).json({ status: "Success" });
    } catch (err) {
        console.error('Error during review submission:', err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;