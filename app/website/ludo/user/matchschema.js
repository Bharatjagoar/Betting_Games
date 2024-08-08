const mongoose = require('mongoose');

const ludoMatchSchema = new mongoose.Schema({
    player: {
        blue: { id: { type: mongoose.Schema.Types.ObjectId, default: null } },
        green: { id: { type: mongoose.Schema.Types.ObjectId, default: null } },
        yellow: { id: { type: mongoose.Schema.Types.ObjectId, default: null } },
        red: { id: { type: mongoose.Schema.Types.ObjectId, default: null } }
    },
    playerPosition: {
        type: Object,
        default: {}
    },
    numberOfMoves: {
        type: Object,
        default: {}
    },
    WinOrLoose: {
        type: Boolean,
        default: false
    },
    tableCategory: {
        type: String,
        required: true
    },
    computerPlayer: {
        id: { type: mongoose.Schema.Types.ObjectId, default: null },
        color: { type: String, enum: ['blue', 'green', 'yellow', 'red'], default: null }
    }
}, { timestamps: true });

const ludoMatchSchemaList = mongoose.model('LudoMatchList', ludoMatchSchema);
module.exports = ludoMatchSchemaList;