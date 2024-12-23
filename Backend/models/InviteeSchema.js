const mongoose = require("mongoose");
const { type } = require("os");
const { types } = require("util");
const {Schema} = mongoose; 

const inviteeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Pending", "Accepted", "Rejected", "Deleted", "Resent", "Expired"],
      default: "Draft", // Initial state
    },
    statusLog: [
      {
        status: {
          type: String,
          enum: ["Draft", "Pending", "Accepted", "Rejected", "Resent", "Expired", "Deleted"],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String, 
    },
    invitedUserId : {
      type : Schema.Types.ObjectId, 
      ref: "User", 
      required : true
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task", // Reference to the task the invitee is associated with
      required: false, // Optional initially, added when the invitee is assigned to a task
    },
    role: {
      type: String,
      enum: ["Invitee", "Assignee"], // Role can be updated later
      default: "Invitee",
    },
    expirationDate: {
      type: Date,
      required: false, // Optional field to set when the invitation expires
    },
  },
  {
    collection: "invitees",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Invitee = mongoose.model("Invitee", inviteeSchema);
module.exports = {
  Invitee
};
