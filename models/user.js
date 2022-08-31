// to create schema we require mongoose
const mongoose = require('mongoose');

// creating schema

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
    name: {
        type: String,
        required: true
    }
}, {
    timestamps:true
});

// telling mongoose it is a model
const User = mongoose.model('User', userSchema);

module.exports = User;