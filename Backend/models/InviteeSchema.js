const mongoose = require("mongoose");

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
      unique: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Pending", "Accepted", "Rejected"],
      default: "Draft", // Initial state
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
module.exports = Invitee;
