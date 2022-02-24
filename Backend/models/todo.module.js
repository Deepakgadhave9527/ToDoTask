const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  id: Number,
  title: String,
  author: String,
  body: String,
  username: String,
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});
const TodoModel = mongoose.model("Todo", todoSchema);
module.exports = TodoModel;
