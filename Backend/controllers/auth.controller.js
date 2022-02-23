const AuthModel = require("../models/Auth.module");
const { compare, encrypt } = require("../helpers/encryption")

class AuthController {
    static UserLogin(req, res) {
        const { username, password } = req.body;
        console.log(username);
        AuthModel.findOne({ username: username }).then(result => {
            if (password == result.password) {

                res.status(200).send({ message: "Login sucessful", data: result })
            } else {
                res.status(404).send({ message: "invalid username address", error: error })
            }
        }).catch(err => {
            res.status(404).send({ message: "invalid password", error: err })

        })


        // AuthModel.findOne({ email: email }, (error, result) => {

        //     if (error || !result) {
        //         res.status(404).send({ message: "invalid Email address", error: error })
        //     }

        //     else if (compare(password, result.password)) {

        //         res.status(200).send({ message: "Login sucessful", data: result })

        //     }

        //     else {
        //         res.status(404).send({ message: "invalid password", error: null })
        //     }
        // });
    }

    static createTask(req, res) {

        const user = req.body;
        // if (user.password) {
        //     user.password = encrypt(user.password)
        // }
        const userDoc = new AuthModel(user);
        userDoc.save().then((result) => {

            res.status(201).send({ message: "User is Created..", data: result })

        }).catch(error => {
            res.status(500).send({ message: "User is Created..", data: error })
        })



    }

    static updateTask(req, res) {
        const { id } = req.params;

        const taskDataFromClient = req.body;
        AuthModel.updateOne({ _id: id }, taskDataFromClient, { new: true }).then((result) => {
            res.status(200).send({ message: "Task is update..", result: result })
        }).catch(error => {
            res.status(500).send({ message: "user is not updated", result: error })
        })
    }

    static deleteTask(req, res) {
        const { id } = req.params;

        AuthModel.findOneAndDelete({ _id: id }).then(result => {
            res.status(200).send({ message: "User is delete", result: result })
        }).catch((error) => {
            res.status(404).send({ message: "User is not Delete", result: error })
        })
    }

    static fetchAllTask(req, res) {

        AuthModel.find({}).then(result => {
            res.status(200).send({ message: "fetach all user", result: result })
        }).catch(err => {
            res.status(404).send({ message: " Not fetach all user", error: err })
        })


    }

}
module.exports = AuthController