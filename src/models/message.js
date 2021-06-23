const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name_room: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("messages", messageSchema);
