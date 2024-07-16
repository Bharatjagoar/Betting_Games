const mongoose = require('mongoose');

const Adminschema = new mongoose.Schema({ 
    name: {
        type: String,
    },
    coins: {
        type: Number,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    reference: {
        type: String,
    },
    matchShare: {
        type: Number,
    },
    commType:{
        type: String,
    },
    casinoShare: {
        type: Number,
    },
    casinoComm: {
        type: Number,
    },
    userType: {
        type: String,
        enum: ["SuperAdmin","MiniAdmin", "MasterAdmin", "SuperAgent", "AgentMaster", "ClientMaster"],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.ObjectId,
        ref: 'Admin',
    },
    mobile: {
        type: String
    },
    status: {
        type: Boolean
    },
    otp: {
        type: Number
    }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', Adminschema);
