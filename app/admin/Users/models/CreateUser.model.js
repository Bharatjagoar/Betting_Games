const mongoose = require('mongoose');

const Registerschema = new mongoose.Schema({ 
    name: {
        type: String,
    },
    my_coins: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["MiniAdmin", "MasterAdmin", "SuperAgent", "AgentMaster", "ClientMaster"]
    },
    username: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    mobile: {
        type: String
    },
    status: {
        type: String
    },
    otp: {
        type: Number
    },
    DOJ: {
        type: Date
    }    
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', Registerschema);
