const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema');
const User = require('../models/user');

// Existing review submission route
router.post('/reviewSubmission', async (req, res) => {
    console.log('test');

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

// Summary Aggregation Endpoint
router.get('/reviews/summary', async (req, res) => {
    try {
        const summaryData = await Review.aggregate([
            {
                $group: {
                    _id: "$studentId",
                    studentId: { $first: "$studentId" },
                    lastName: { $first: "$lastName" },
                    firstName: { $first: "$firstName" },
                    teamName: { $first: "$teamName" },
                    avgCooperation: { $avg: "$CooperationRating" },
                    avgConceptual: { $avg: "$ConceptualContributionRating" },
                    avgPractical: { $avg: "$PracticalContributionRating" },
                    avgWorkEthic: { $avg: "$WorkEthicRating" },
                    averageScore: { 
                        $avg: { 
                            $avg: ["$CooperationRating", "$ConceptualContributionRating", "$PracticalContributionRating", "$WorkEthicRating"] 
                        } 
                    },
                    peersResponded: { $sum: 1 }
                }
            }
        ]);
        res.json(summaryData);
    } catch (error) {
        console.error('Error fetching summary data:', error.message);
        res.status(500).send("Error fetching summary data");
    }
});

module.exports = router;
