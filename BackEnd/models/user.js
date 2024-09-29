const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        default: null
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema, "users");
module.exports = User;