const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: String, // Now storing the creator's name as a string
        required: true,
        trim: true,
        maxlength: 32
    },
    creatorEmail: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['backlog', 'in-progress', 'completed', 'on-hold', 'cancelled', 'blocked', 'archived'],
        default: 'backlog',
    },
    ETA: {
        type: Number, // Duration in minutes
        required: false,
    },
    ETAUnit: {
        type: String,
        enum: ['minutes', 'hours'], // Unit of the ETA field
        default: 'minutes',
    },
    deadline: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        trim: true,
    },
    attachments: {
        type: [String], // Array of URLs or file paths
    }
}, 
{
    collection: "task", 
    timestamps: {
        createdAt: "createdAt", 
        updatedAt: "updatedAt", 
    }, 
} 
); 
const Task = mongoose.model("Task", taskSchema); 
module.exports = {
    Task
}