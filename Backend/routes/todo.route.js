const route = require("express").Router();
const TodoCtrl = require("../controllers/todo.controller");
route.post("/", TodoCtrl.createTask);
route.put("/:id", TodoCtrl.updateTask);
route.delete("/:id", TodoCtrl.deleteTask);
route.get("/:id", TodoCtrl.fetchSingleTask);
route.get("/", TodoCtrl.fetchAllTask);
route.delete("/name/:username", TodoCtrl.deleteManyTask);

module.exports = route;
