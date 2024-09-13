var express = require('express'); 
var router = express.Router(); 

const TaskController = require("../controllers/taskController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.post("/task", validateToken, TaskController.createTask); 
router.put("/task/:id", validateToken, TaskController.updateTask); 
router.get("/task", validateToken, TaskController.getAllTasks)

module.exports = router
