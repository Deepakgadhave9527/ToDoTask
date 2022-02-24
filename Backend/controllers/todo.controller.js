const TodoModel = require("../models/todo.module");

class TodoCtrl {
  static createTask(req, res) {
    const taskDataFromClient = req.body;
    const taskDocument = TodoModel(taskDataFromClient);
    taskDocument
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "Task is created", result: taskDataFromClient });
      })
      .catch((error) => {
        res.status(500).send({ message: "Task is not Create", result: error });
      });
  }

  static updateTask(req, res) {
    const { id } = req.params;
    const taskDataFromClient = req.body;
    TodoModel.updateOne({ _id: id }, taskDataFromClient, { new: true })
      .then((result) => {
        res.status(200).send({ message: "Task is update..", result: result });
      })
      .catch((error) => {
        res.status(500).send({ message: "user is not updated", result: error });
      });
  }

  static deleteTask(req, res) {
    const { id } = req.params;
    const taskDataFromClient = req.body;
    console.log(id);

    TodoModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "User is delete", result: result });
      })
      .catch((error) => {
        res.status(404).send({ message: "User is not Delete", result: error });
      });
  }

  static deleteManyTask(req, res) {
    const { username } = req.params;
    console.log(username);
    TodoModel.deleteMany({ username: username }, { multi: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "Delete Many Users is delete", result: result });
      })
      .catch((error) => {
        res
          .status(404)
          .send({ message: "Many Users is not Delete", result: error });
      });
  }

  static fetchSingleTask(req, res) {
    const { id } = req.params;
    TodoModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Fetch single User", result: result });
      })
      .catch((error) => {
        res
          .status(404)
          .send({ message: "Single User is not is fetched", result: error });
      });
  }
  static fetchAllTask(req, res) {
    TodoModel.find({})
      .then((result) => {
        res.status(200).send({ message: "fetach all user", result: result });
      })
      .catch((err) => {
        res.status(404).send({ message: " Not fetach all user", error: err });
      });
  }
}

module.exports = TodoCtrl;
