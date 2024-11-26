const mongoose = require('mongoose');


//MONGO SCHEMA FOR USER
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
    teams: {
        type: String,
        required: false,
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},

{ timestamps: true });

const User = mongoose.model('User', userSchema, "users");
module.exports = User;