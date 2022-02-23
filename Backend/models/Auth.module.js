const mongoose = require("mongoose");
const Schema = mongoose.Schema
const authSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    createdAt: { type: Date, default: Date.now },


})
const Auth = mongoose.model("LoginAuth", authSchema)
module.exports = Auth;