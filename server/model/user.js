const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    clips: [ {
        date: {
            type: Date,
            default: new Date()
        },
        text: {
            type: String,
            min: 4
        },
        owner: {
            type: String,
            required: true
        }
    } ],
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', userSchema);