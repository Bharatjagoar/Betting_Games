const mongoose = require('mongoose');

// Define the main schema with the nested event object
const dataSchema = new mongoose.Schema({
  competition: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  marketCount: {
    type: Number,
    required: true,
  },
  competitionRegion: {
    type: String,
    required: true,
  },
  
});

// Create and export the model
const CompetitionList = mongoose.model('CompetitionList', dataSchema);
module.exports = CompetitionList;
