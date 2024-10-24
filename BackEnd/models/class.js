const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({

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

    },
    secret: {
        type: String,
        default: null
    },

}, { timestamps: true });

const Class = mongoose.model('Class', classSchema, "classes");
module.exports = Class;