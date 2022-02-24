const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", AuthController.UserLogin);
router.post("/post/", AuthController.createTask);
router.get("/", AuthController.fetchAllTask);
router.put("/:id", AuthController.updateTask);
router.delete("/:id", AuthController.deleteTask);
module.exports = router;
