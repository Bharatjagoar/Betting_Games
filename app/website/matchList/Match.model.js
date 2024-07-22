const mongoose = require('mongoose');

// Define the main schema with the nested event object
const dataSchema = new mongoose.Schema({
  event: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    openDate: {
      type: Date,
      required: true,
    },
  },
  marketCount: {
    type: Number,
    required: true,
  },
  scoreboard_id: {
    type: String,
    required: true,
  },
  selections: {
    type: String,
    required: false,
  },
  liability_type: {
    type: Number,
    required: true,
  },
  undeclared_markets: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const MatchList = mongoose.model('MatchList', dataSchema);
module.exports = MatchList;
