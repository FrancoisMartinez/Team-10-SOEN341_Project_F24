const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    studentEmail : {
        type: String,
        required: false
    },
    reviewer: {
        type: String,
        required: false
    },
    CooperationRating: {
        type: Number,
        required: true
    },
    ConceptualContributionRating: {
        type: Number,
        required: true
    },
    PracticalContributionRating: {
        type: Number,
        required: true
    },
    WorkEthicRating: {
        type: Number,
        required: true
    },
    CooperationComment: {
        type: String,
        required: false
    },
    ConceptualContributionComment: {
        type: String,
        required: false
    },
    PracticalContributionComment: {
        type: String,
        required: false
    },
    WorkEthicComment: {
        type: String,
        required: false
    },


}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema, "reviews");
module.exports = Review;