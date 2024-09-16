const {User} = require("../models/Auth"); 
const {Task} = require("../models/Task"); 
var mongoose = require("mongoose"); 
var ObjectId = mongoose.Types.ObjectId; 


const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils");  


const TaskController = module.exports; 

TaskController.createTask = async(req, res) =>{
    try {
        const id = req.user.id; 
        const email = req.user.email; 
        const {
            title,
            priority,
            status,
            ETA,
            ETAUnit,
            deadline,
            description,
            comment,
            completionDate,
            tags,
            attachments
        } = req.body; 
        if(!title){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST)
        }
        const user = await User.findById(id); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_ALREADY_EXIST); 
        }
        // Optional field validation
        if (priority && !['Low', 'Medium', 'High', 'Urgent'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority value' });
        }
    
        if (status && !['backlog', 'in-progress', 'completed', 'on-hold', 'cancelled', 'blocked', 'archived'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
    
        if (ETA !== undefined && (typeof ETA !== 'number' || ETA < 0)) {
            return res.status(400).json({ message: 'Invalid ETA value. It must be a non-negative number representing duration in minutes.' });
        }
    
        if (ETAUnit && !['minutes', 'hours'].includes(ETAUnit)) {
            return res.status(400).json({ message: 'Invalid ETA unit. It must be either "minutes" or "hours".' });
        }
    
        const newTask = new Task({
            title,
            createdBy : user.firstName,
            creatorEmail : email,
            priority,
            status,
            ETA,
            deadline,
            description,
            createdAt: new Date(), // Automatically setting the created date
            comment,
            completionDate,
            tags,
            attachments,
        }); 
        // Save the task to the database
        const savedTask = await newTask.save();
        res.status(200).json({
            message: "Task created successfully", 
            task: savedTask
        })

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
TaskController.updateTask = async(req, res) =>{
    try {
        const { id } = req.params;
        const { userId } = req.user.id
        console.log(userId)
        const {
            title,
            priority,
            status,
            ETA,
            ETAUnit,
            deadline,
            description,
            comment,
            completionDate,
            tags,
            attachments
        } = req.body; 

        if(Object.keys(req.body).length === 0){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST)
        }
        // Validation
        if (title && typeof title !== 'string') {
            return res.status(400).json({ message: 'Title must be a string' });
        }

        if (priority && !['Low', 'Medium', 'High', 'Urgent'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority value' });
        }
    
        if (status && !['backlog', 'in-progress', 'completed', 'on-hold', 'cancelled', 'blocked', 'archived'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
    
        if (ETA !== undefined && (typeof ETA !== 'number' || ETA < 0)) {
            return res.status(400).json({ message: 'Invalid ETA value. It must be a non-negative number representing duration in minutes.' });
        }
    
        if (ETAUnit && !['minutes', 'hours'].includes(ETAUnit)) {
            return res.status(400).json({ message: 'Invalid ETA unit. It must be either "minutes" or "hours".' });
        }
  
        const user = await User.findOne(userId); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
        {
            title,
            priority,
            status,
            ETA,
            ETAUnit,
            deadline,
            description,
            comment,
            completionDate,
            tags,
            attachments
        }, { new: true, runValidators: true } 
    ); 
    if (!updatedTask) {
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND)
    }
    res.status(200).json({
        message: 'Task updated successfully',
        task: updatedTask,
    });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}; 
TaskController.getAllTasks = async(req, res) =>{
    try {
        const id = req.user.id; 
        const email = req.user.email
        console.log(id)
        const user = await User.findById(id); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND)
        }; 
        let {limit, page, taskId, priority,  status, sortBy, from, to} = req.query; 
        page = page || 1; 
        limit = limit || 5; 
        let skip = (page - 1) * limit;  
        let query = {creatorEmail : email}
        if(taskId){
            query._id = new ObjectId(taskId)
        }
        if(priority){
            query.priority = priority
        }
        if(status){
            query.status = status
        }
         // Handle date range for createdAt field
        const fromDate = from ? new Date(from) : null;
        const toDate = new Date(new Date(to).setHours(23, 59, 59, 999));
        if(fromDate && toDate) {
            query.createdAt = {
                $gte: fromDate,
                $lte: toDate
            };
        } else if (fromDate) {
            query.createdAt = { $gte: fromDate };
        } else if (toDate) {
            query.createdAt = { $lte: toDate };
        }
        const sort = {createdAt: -1};
        if (sortBy === 'latest') {
            sort.createdAt = -1; // Sort by latest
        } else if (sortBy === 'oldest') {
            sort.createdAt = 1;  // Sort by oldest
        }
        let taskList = await Task.aggregate([
            {
                $match : query
            },
            {
                $sort : sort
            },
            {
                $skip: skip
            }, 
            {
                $limit: parseInt(limit)
            }
        ])
        const totalCount = await Task.countDocuments(query); 
        const payload = {
            data: taskList, 
            totalTask: totalCount, 
            currentPage: page 
        }
        return res.status(200).json(payload)
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
TaskController.getCompleteTask = async(req, res) =>{
    try {
        const id = req.user.id; 
        const user = await User.findById(id); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND)
        }
        let { limit, page, sortBy } = req.query; 
         // Set default values for pagination if not provided
        page = page || 1;
        limit = limit || 5;
        let skip = (page - 1) * limit; 
        let query = {
            creatorEmail: email,
            status: 'completed'
        };
        const sort = { createdAt: -1 }; // Default sorting by latest
        if (sortBy === 'latest') {
            sort.createdAt = -1; // Sort by latest
        } else if (sortBy === 'oldest') {
            sort.createdAt = 1;  // Sort by oldest
        }
        let taskList = await Task.aggregate([
            {
                $match: query
            },
            {
                $sort: sort
            },
            {
                $skip: skip
            },
            {
                $limit: parseInt(limit)
            }
        ]);
        const totalCount = await Task.countDocuments(query); 
        const payload = {
            data: taskList,
            totalTask: totalCount,
            currentPage: page
        };
        return res.status(200).json(payload);
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}

