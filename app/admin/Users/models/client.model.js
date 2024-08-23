const mongoose = require('mongoose');

const clientschema = new mongoose.Schema({ 
    name: {
        type: String,
    },
    coins: {
        type: Number,
        required: true,
    },
    explore: {
        type: Number,
        default: 0
    },
    Password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    username: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.ObjectId,
        ref: 'Admin',
        required: true
    },
    mobile: {
        type: String
    },
    status: {
        type: Boolean
    },  
}, {
    timestamps: true
});

module.exports = mongoose.model('client', clientschema);
