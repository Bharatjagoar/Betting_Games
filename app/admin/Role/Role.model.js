const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for roles
const roleSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    unique: true
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
