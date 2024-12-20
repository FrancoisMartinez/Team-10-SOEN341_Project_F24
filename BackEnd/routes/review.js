const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');
const User = require('../models/user');

//review backend

router.post('/reviewSubmission', async (req, res) => {
    console.log('test')

    const { user, ratings, comments } = req.body;

    try {
        const reviews = await Review.create({
            studentEmail: user.studentEmail,
            reviewer: user.reviewer,
            CooperationRating: ratings['Cooperation'],
            ConceptualContributionRating: ratings['ConceptualContribution'],
            PracticalContributionRating: ratings['PracticalContribution'],
            WorkEthicRating: ratings['WorkEthic'],
            CooperationComment: comments['Cooperation'] || '',
            ConceptualContributionComment: comments['ConceptualContribution'] || '',
            PracticalContributionComment: comments['PracticalContribution'] || '',
            WorkEthicComment: comments['WorkEthic'] || '',
        });

        const student = await User.findOneAndUpdate(
            { email: user.studentEmail },
            { $push: { reviews: reviews._id } },
            { new: true }
        );

        return res.status(200).json({ status: "Success" });
    } catch (err) {
        console.error('Error during review submission:', err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;