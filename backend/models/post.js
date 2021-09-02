const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  text: String,
  status: String,
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const post = mongoose.model("post", roleSchema);
module.exports = post;
