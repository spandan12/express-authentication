const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Post", schema);
