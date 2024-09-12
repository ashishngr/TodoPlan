const {User} = require("../models/Auth"); 
const {Task} = require("../models/Task"); 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils");  


const TaskController = module.exports; 

TaskController.createTask = async(req, res) =>{
    try {
        const id = req.user.id; 
        const email = req.user.email; 
        const {
            title,
            createdBy,
            creatorEmail,
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

