const mongoose = require("mongoose");

const schema = mongoose.Schema({
  token: { type: String, unique: true },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("UserSession", schema);
