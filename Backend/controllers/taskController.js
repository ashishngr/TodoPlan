const { User } = require("../models/Auth");
const { Task } = require("../models/Task");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

const { ERRORS } = require("../constants");
const ErrorUtils = require("../utils/errorUtils");

const TaskController = module.exports;

TaskController.createManualTask = async (req, res) => {
  try {
    const id = req.user.id;
    const email = req.user.email;
    const {
      title, //
      priority, //
      status, //
      ETA, //
      ETAUnit, //
    } = req.body;
    if (!title) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const user = await User.findById(id);

    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    // Optional field validation
    if (priority && !["Low", "Medium", "High", "Urgent"].includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }

    if (
      status &&
      ![
        "backlog",
        "in-progress",
        "completed",
        "on-hold",
        "cancelled",
        "blocked",
        "archived",
      ].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (ETAUnit && !["minutes", "hours"].includes(ETAUnit)) {
      return res.status(400).json({
        message: 'Invalid ETA unit. It must be either "minutes" or "hours".',
      });
    }

    const createdAt = new Date();
    const createdAtDate = createdAt.toISOString().split("T")[0];
    const newTask = new Task({
      title,
      createdBy: user._id,
      creatorEmail: email,
      creatorName: user.firstName,
      priority,
      status,
      ETA,
      ETAUnit,
      createdAt: new Date(), // Automatically setting the created date,
      createdAtDate,
      activity: [
        {
          updatedBy: user._id,
          updatedByName: `${user.firstName} ${user.lastName}`,
          message: "Task created",
          updatedAt: new Date(),
        },
      ],
    });
    // Save the task to the database
    const savedTask = await newTask.save();
    res.status(200).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getSingleManualTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const task = await Task.findById(taskId)
      .select(
        "title description assignees priority status subTasks ETA ETAUnit deadline"
      )
      .populate("assignees", "name email");
    if (!task) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }
    console.log("Task ->", task);
    res.status(200).json({
      message: "Task retrieved successfully",
      task: task,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};

TaskController.updateTaskBasicInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user.id;
    console.log("--------------------------------", userId);
    console.log("--------------------------------Id", id);

    const {
      title,
      priority,
      status,
      ETA,
      ETAUnit,
      deadline,
      description,
      tags,
      assignees,
    } = req.body;

    if (Object.keys(req.body).length === 0) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    // Validation
    if (title && typeof title !== "string") {
      return res.status(400).json({ message: "Title must be a string" });
    }

    if (priority && !["Low", "Medium", "High", "Urgent"].includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }

    if (
      status &&
      ![
        "backlog",
        "in-progress",
        "completed",
        "on-hold",
        "cancelled",
        "blocked",
        "archived",
      ].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (ETA !== undefined && (typeof ETA !== "number" || ETA < 0)) {
      return res.status(400).json({
        message:
          "Invalid ETA value. It must be a non-negative number representing duration in minutes.",
      });
    }

    if (ETAUnit && !["minutes", "hours"].includes(ETAUnit)) {
      return res.status(400).json({
        message: 'Invalid ETA unit. It must be either "minutes" or "hours".',
      });
    }

    const user = await User.findOne(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }

    // Prepare the fields to update
    const updateFields = {};
    if (title) updateFields.title = title;
    if (priority) updateFields.priority = priority;
    if (status) updateFields.status = status;
    if (ETA !== undefined) updateFields.ETA = ETA;
    if (ETAUnit) updateFields.ETAUnit = ETAUnit;
    if (deadline) updateFields.deadline = deadline;
    if (description) updateFields.description = description;
    if (tags) updateFields.tags = tags;
    if (assignees && Array.isArray(assignees)) {
      updateFields.assignees = assignees;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }
    // Log activity for the update
    const activityLog = {
      updatedBy: user._id,
      updatedByName: `${user.firstName} ${user.lastName}`,
      updatedAt: new Date(),
      message: `Task updated with new information: ${Object.keys(
        updateFields
      ).join(", ")}.`,
    };
    updatedTask.activity.push(activityLog);
    await updatedTask.save(); // Save the task with the new activity log

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};

TaskController.addSubTask = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const { taskId } = req.params;
    const subtasks = req.body;
    if (!Array.isArray(subtasks) || subtasks.length === 0) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const user = await User.findOne(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const validStatuses = ["complete", "backlog"];
    for (const subtask of subtasks) {
      const { title, status } = subtask;
      if (!title || !validStatuses.includes(status)) {
        return ErrorUtils.APIErrorResponse(res, ERRORS.INVALID_SUBTASK_STATUS);
      }
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }

    // Update the task with new subtasks
    subtasks.forEach((subtask) => task.subTasks.push(subtask));
    // Log activity for each subtask addition
    const activityLog = {
      updatedBy: user._id,
      updatedByName: `${user.firstName} ${user.lastName}`,
      updatedAt: new Date(),
      message: `Added ${subtasks.length} new subtask(s): ${subtasks
        .map((st) => st.title)
        .join(", ")}.`,
    };
    task.activity.push(activityLog);

    // Save the updated task
    await task.save();

    res.status(200).json({
      message: "Subtask added successfully",
      task: task,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getSubTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user.id;
    const user = await User.findOne(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const task = await Task.findById(taskId).select("subTasks");
    if (!task) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }
    res.status(200).json({
      message: "Task fetched successfully",
      task: task,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getAllTasks = async (req, res) => {
  try {
    const id = req.user.id;
    // const email = req.user.email
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }

    let query = { createdBy: user._id };
    let taskList = await Task.aggregate([
      {
        $match: query,
      },
    ]);
    const totalCount = await Task.countDocuments(query);
    const payload = {
      data: taskList,
      totalTask: totalCount,
      // currentPage: page
    };
    return res.status(200).json(payload);
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.deleteSubTask = async (req, res) => {
  try {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&");
    const { taskId, subTaskId } = req.params;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    console.log("Sub task Id", subTaskId);
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const subTaskIndex = task.subTasks.findIndex(
      (subTask) => subTask._id.toString() === subTaskId
    );
    if (subTaskIndex === -1) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    const deletedSubTask = task.subTasks.splice(subTaskIndex, 1);
    const activityLog = {
      updatedBy: req.user._id, // Assuming you have user info from authentication middleware
      updatedByName: `${user.firstName} ${user.lastName}`,
      updatedAt: new Date(),
      message: `Subtask "${deletedSubTask[0].title}" was deleted.`,
    };
    task.activity.push(activityLog);
    await task.save();
    return res
      .status(200)
      .json({ message: "Subtask deleted successfully", task });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getCompleteTask = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    let { limit, page, sortBy } = req.query;
    // Set default values for pagination if not provided
    page = page || 1;
    limit = limit || 5;
    let skip = (page - 1) * limit;
    let query = {
      creatorEmail: email,
      status: "completed",
    };
    const sort = { createdAt: -1 }; // Default sorting by latest
    if (sortBy === "latest") {
      sort.createdAt = -1; // Sort by latest
    } else if (sortBy === "oldest") {
      sort.createdAt = 1; // Sort by oldest
    }
    let taskList = await Task.aggregate([
      {
        $match: query,
      },
      {
        $sort: sort,
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
    ]);
    const totalCount = await Task.countDocuments(query);
    const payload = {
      data: taskList,
      totalTask: totalCount,
      currentPage: page,
    };
    return res.status(200).json(payload);
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.updateSubTaskStatus = async (req, res) => {
  try {
    const { taskId, subTaskId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Find the subtask index within the task
    const subTaskIndex = task.subTasks.findIndex(
      (subTask) => subTask._id.toString() === subTaskId
    );

    if (subTaskIndex === -1) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    // Update the status of the found subtask
    task.subTasks[subTaskIndex].status = status;
    // Create an activity log for the update
    const activityLog = {
      updatedBy: req.user._id, // Assuming you have user info from authentication middleware
      updatedByName: `${user.firstName} ${user.lastName}`,
      updatedAt: new Date(),
      message: `Subtask "${task.subTasks[subTaskIndex].title}" status updated to "${status}".`,
    };
    task.activity.push(activityLog);

    // Save the updated task with the modified subtask
    await task.save();
    res.status(200).json(task.subTasks[subTaskIndex]);
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getActivityData = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const task = await Task.findById(taskId).populate({
      path: "activity",
      select: "updatedByName updatedAt message", // Populate only the required fields
      options: { sort: { updatedAt: -1 } }, // Sort by updatedAt in descending order
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ activity: task.activity });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.addComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    if (!text) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }
    const newComment = {
      author: user._id,
      authorName: `${user.firstName} ${user.lastName}`,
      text,
    };
    task.comments.push(newComment);
    await task.save();
    return res.status(200).json({
      message: "omment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
TaskController.getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_TASK_FOUND);
    }
    const sortedComments = task.comments.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return res.status(200).json({
      success: true,
      comments: sortedComments.map((comment) => ({
        id: comment._id,
        text: comment.text,
        authorName: comment.authorName,
        createdAt: comment.createdAt,
        authorId: comment.author._id,
      })),
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
