const { User } = require("../models/Auth");
const { Task } = require("../models/Task");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
const { ERRORS } = require("../constants");
const ErrorUtils = require("../utils/errorUtils");

const UserController = module.exports;

UserController.HomePageInfo = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    //TODO : Extract the following information - around the user. - In Progress Tasks number, Backlog Task Number, Blocked Tasks Number, Done Tasks Number. List of todays tasks along with numbers , list of in-progress tasks along with numbers.
    // TODO : Also extract the task createdAtDate date fields - just extract the dates,
   
     // Set today's date in UTC to start at midnight UTC
     const today = new Date();
     today.setUTCHours(0, 0, 0, 0); // Midnight in UTC
     const tomorrow = new Date(today);
     tomorrow.setUTCDate(today.getUTCDate() + 1); // Next day midnight UTC
 
     console.log("Today UTC:", today);
     console.log("Tomorrow UTC:", tomorrow);


    const taskInfo = await Task.aggregate([
      {
        $match: {
            createdBy: new mongoose.Types.ObjectId(id), // Match tasks by the user's ID
        },
      },
      {
        $facet: {
          inProgressTasks: [
            { $match: { status: "in-progress" } },
            { $count: "count" },
          ],
          backlogTasks: [
            { $match: { status: "backlog" } },
            { $count: "count" },
          ],
          blockedTasks: [
            { $match: { status: "blocked" } },
            { $count: "count" },
          ],
          doneTasks: [{ $match: { status: "completed" } }, { $count: "count" }],
          inProgressTaskList: [
            { $match: { status: "in-progress" } },
            {
              $project: {
                _id: 1,
                title: 1,
                creatorName: 1,
              },
            },
          ],
          todaysTasks: [
            {
              $match: {
                createdAt: {
                  $gte: today,
                  $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                },
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                creatorName: 1,
              },
            },
          ],
          taskCreatedDates: [
            {
              $project: {
                _id: 0,
                createdAtDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          inProgressTasks: { $arrayElemAt: ["$inProgressTasks.count", 0] },
          backlogTasks: { $arrayElemAt: ["$backlogTasks.count", 0] },
          blockedTasks: { $arrayElemAt: ["$blockedTasks.count", 0] },
          doneTasks: { $arrayElemAt: ["$doneTasks.count", 0] },
          inProgressTaskList: 1,
          todaysTasks: 1,
          taskCreatedDates: "$taskCreatedDates.createdAtDate",
        },
      },
    ]);
    res.status(200).json({
      inProgressTasks: taskInfo[0].inProgressTasks || 0,
      backlogTasks: taskInfo[0].backlogTasks || 0,
      blockedTasks: taskInfo[0].blockedTasks || 0,
      doneTasks: taskInfo[0].doneTasks || 0,
      inProgressTaskList: taskInfo[0].inProgressTaskList || [],
      todaysTasks: taskInfo[0].todaysTasks || [],
      taskCreatedDates: taskInfo[0].taskCreatedDates || [],
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
