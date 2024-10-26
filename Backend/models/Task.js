const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

const subTaskSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["complete", "backlog"],
    default: "backlog", // Default status for sub-tasks
  },
});
// Comment Schema
const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Activity Schema
const activitySchema = new Schema({
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedByName: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
});

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId, // Now storing the creator's name as a string
      ref: "User",
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    creatorName : {
      type: String, 
      required: true,
      trim: true,
    },
    assignees: [
      {
        type: String, 
      },
    ],
    invitees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invitee", // Invitees associated with the task
      },
    ],
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "High",
    },
    status: {
      type: String,
      enum: [
        "backlog",
        "in-progress",
        "completed",
        "on-hold",
        "cancelled",
        "blocked",
        "archived",
      ],
      default: "backlog",
    },
    ETA: {
        type: Number, 
        min: 1, 
    },
    ETAUnit: {
      type: String,
      enum: ["minutes", "hours"], 
      default: "minutes",
    },
    deadline: {
      type: Date,
    },
    subTasks: [subTaskSchema],
    activity: [activitySchema],
    comments: [commentSchema],
    description: {
      type: String,
      trim: true,
    },
    attachments: {
        type: [Schema.Types.Mixed], // Array of URLs or file paths
    },
    comment: {
      type: String,
      default: "No Comments",
    },
    taskType: {
      type: String,
      enum: ["Manual", "AI", "Google"],
      required: true,
      default: "Manual", // Default to Manual creation
    },
    prompt: {
      type: String, // Only applicable for AI tasks
      trim: true,
      default: null,
    },
    googleTaskId: {
      type: String, // Only applicable for Google Tasks
      trim: true,
      default: null,
    },
    googleCalendarId: {
      type: String, // Calendar ID associated with the Google Task
      trim: true,
      default: null,
    },
    tag :{
      type : [String], 
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every(tag => typeof tag === "string");
        },
        message: props => `${props.value} is not a valid tag array!`
      },
      default: [],
    }, 
    createdAtDate: {
      type: String,
      required: true,
    },
  },
  {
    collection: "task",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
taskSchema.index({ createdBy: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });

taskSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAtDate = new Date().toISOString().split("T")[0]; // Sets date in 'YYYY-MM-DD' format
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = {
  Task,
};