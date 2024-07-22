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
    },
    countryCode: {
      type: String,
    },
    timezone: {
      type: String,
    },
    openDate: {
      type: Date,
      required: true,
    },
  },
  marketCount: {
    type: Number,
  },
  scoreboard_id: {
    type: String,
  },
  selections: {
    type: String,
  },
  liability_type: {
    type: Number,
  },
  undeclared_markets: {
    type: Number,
  },
});

// Create and export the model
const MatchList = mongoose.model('MatchList', dataSchema);
module.exports = MatchList;
