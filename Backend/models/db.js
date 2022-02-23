const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.dbhost + "/" + process.env.dbname;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.on("connected", () => console.log("conneted to db " + "URI " + uri))
connection.on("disconnect", () => console.log("disconnect to db"))
connection.on("error", () => console.log("connection error to connect to db"))