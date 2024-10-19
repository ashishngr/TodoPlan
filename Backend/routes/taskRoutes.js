var express = require('express'); 
var router = express.Router(); 

const TaskController = require("../controllers/taskController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.post("/task/manual", validateToken, TaskController.createManualTask); 
router.post("/task/:taskId/subtask", validateToken, TaskController.addSubTask);
router.put("/manualTask/:id", validateToken, TaskController.updateTaskBasicInformation); 
router.get("/task", validateToken, TaskController.getAllTasks)
router.get("/task/:taskId", validateToken, TaskController.getSingleManualTask); 
router.get("/subtask/:taskId", validateToken, TaskController.getSubTask)
router.delete("/task/:taskId/subTask/:subTaskId", validateToken, TaskController.deleteSubTask);

module.exports = router
