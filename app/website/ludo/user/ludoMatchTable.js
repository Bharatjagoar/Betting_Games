const mongoose = require("mongoose");

const ludoMatchTableSchema = new mongoose.Schema({
    thousand: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "LudoMatchList",
        default: []
    },
    twoThousand: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "LudoMatchList",
        default: []
    },
    fiveThousand: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "LudoMatchList",
        default: []
    },
    tenThousands: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "LudoMatchList",
        default: []
    }
}, { timestamps: true });

// Pre-save hook to ensure only one document is created
ludoMatchTableSchema.pre('save', async function (next) {
    const LudotableList = mongoose.model('LudotableList', ludoMatchTableSchema);
    try {
        const existingLudotableList = await LudotableList.findOne();

        if (!existingLudotableList) {
            next();
        } else {
            throw new Error("Document already exists");
        }
    } catch (error) {
        console.error('Error ensuring single LudotableList document:', error);
        next(error);
    }
});

const ludoMatchTableList = mongoose.model('LudotableList', ludoMatchTableSchema);

// Function to initialize the collection with a single document if it doesn't exist
async function initializeLudoMatchTable() {
    try {
        const existingLudotableList = await ludoMatchTableList.findOne();

        if (!existingLudotableList) {
            const newLudotableList = new ludoMatchTableList();
            await newLudotableList.save();
            console.log("LudotableList document created successfully.");
        } else {
            console.log("LudotableList document already exists.");
        }
    } catch (error) {
        console.error('Error initializing LudotableList:', error);
    }
}

module.exports = { ludoMatchTableList, initializeLudoMatchTable };