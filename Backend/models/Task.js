const { text } = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invitee", // Invitees who are assigned to the task
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
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
    activity: [
      {
        updatedBy: {
          type: Schema.Types.ObjectId, // Referencing the user who updated the task
          ref: "User",
          required: true,
        },
        updatedByName: {
          type: String, // Storing the name of the user who updated
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now, 
        },
        message: {
          type: String, 
          required: true,
        },
      },
    ],
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

const Task = mongoose.model("Task", taskSchema);
module.exports = {
  Task,
};

function arrayLimit(val) {
    return val.length <= 10;
}