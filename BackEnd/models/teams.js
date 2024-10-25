const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({

    teamID: {
        type: String,
        required: true,
        unique: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    emails: {
        type: [String],
        required: true
    }
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema, 'teams');


module.exports = Team;
