const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    otp: {
        type: Number
    },
    role: {
        type: String,
        default: 'donor'
    },
    createdDateTime: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
