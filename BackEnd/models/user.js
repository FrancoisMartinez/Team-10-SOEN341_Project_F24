const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    instructor: {
        type: Boolean,
        required: true,
    },
    teams : {
        type: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    secret: {
        type: String,
        default: null
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema, "users");
module.exports = User;