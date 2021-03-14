const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true, minlength: 4 },
  location: { type: String, default: "all" },
  type: { type: String },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
