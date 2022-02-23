const express = require("express");
const bodyParser = require("body-parser");
require("./models/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
    res.status(200).send("server is running get " + PORT + process.env.dbhost)
})

app.use("/api/v1/todo", require("../Backend/routes/todo.route"))
app.use("/api/auth", require("../Backend/routes/auth.route"));

app.listen(PORT, () => {
    console.log(`Server is running at PORT ....${PORT}`);

})
// {
//     "username": "test",
//         "email": "test@test.com",
//             "password": "abc",
//                 "mobile": "9764010173",
//                     "post": {

//         "title": "footer",
//             "author": "add footer",
//                 "body": "In Progress"
//     }
// }