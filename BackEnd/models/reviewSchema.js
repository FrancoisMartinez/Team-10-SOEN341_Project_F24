const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    studentId: { // ID of the student being reviewed
        type: String,
        required: true
    },
    firstName: { // First name of the student being reviewed
        type: String,
        required: true
    },
    lastName: { // Last name of the student being reviewed
        type: String,
        required: true
    },
    teamName: { // Team name for grouping in detailed view
        type: String,
        required: true
    },
    studentEmail: { // Email of the student being reviewed
        type: String,
        required: false
    },
    reviewer: { // ID or email of the student providing the review
        type: String,
        required: false
    },
    CooperationRating: { // Rating for Cooperation
        type: Number,
        required: true
    },
    ConceptualContributionRating: { // Rating for Conceptual Contribution
        type: Number,
        required: true
    },
    PracticalContributionRating: { // Rating for Practical Contribution
        type: Number,
        required: true
    },
    WorkEthicRating: { // Rating for Work Ethic
        type: Number,
        required: true
    },
    CooperationComment: { // Comment for Cooperation
        type: String,
        required: false
    },
    ConceptualContributionComment: { // Comment for Conceptual Contribution
        type: String,
        required: false
    },
    PracticalContributionComment: { // Comment for Practical Contribution
        type: String,
        required: false
    },
    WorkEthicComment: { // Comment for Work Ethic
        type: String,
        required: false
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema, "reviews");
module.exports = Review;
