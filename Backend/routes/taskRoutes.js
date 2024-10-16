var express = require('express'); 
var router = express.Router(); 

const TaskController = require("../controllers/taskController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.post("/task/manual", validateToken, TaskController.createManualTask); 
router.put("/manualTask/:id", validateToken, TaskController.updateTaskBasicInformation); 
router.get("/task", validateToken, TaskController.getAllTasks)
router.get("/task/:taskId", validateToken, TaskController.getSingleManualTask)

module.exports = router
