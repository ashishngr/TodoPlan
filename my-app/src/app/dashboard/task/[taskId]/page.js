"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import { Input } from "@/components/ui/input";
import { Select, MenuItem, Chip } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import dayjs from "dayjs";
import SubTask from "@/app/components/SubTask";
import API from "@/app/common/api";
import { formatDate } from "@/utility/validateDateFormat";

const statusColors = {
  backlog: "rgb(255, 213, 79)", // Soft Yellow
  "in-progress": "rgba(33, 150, 243, 0.5)", // Soft Blue
  completed: "rgba(76, 175, 80, 0.5)", // Soft Green
  "on-hold": "rgba(255, 152, 0, 0.5)", // Soft Orange
  cancelled: "rgba(244, 67, 54, 0.5)", // Soft Red
  blocked: "rgba(156, 39, 176, 0.5)", // Soft Purple
  archived: "rgba(96, 125, 139, 0.5)",
};
const priorityColors = {
  Low: "#B0E57C", // Light green
  Medium: "#FFDE59", // Yellow
  High: "#FF8C42", // Orange
  Urgent: "#FF5C5C", // Red
};
const colors = [
  "#3f51b5", // Indigo
  "#ff5722", // Deep Orange
  "#4caf50", // Green
  "#ff9800", // Orange
  "#9c27b0", // Purple
  "#009688", // Teal
  "#795548", // Brown
  "#e91e63", // Pink
];

const page = () => {
  const [subTasks, setSubTasks] = useState([""]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskETAUnit, setTaskETAUnit] = useState("");
  const [taskETATime, setTaskETATime] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(dayjs());
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const [activeTab, setActiveTab] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [activities, setActivities] = useState([]);
  const inputRefs = useRef([]);
  const params = useParams();
  const taskId = params.taskId;
  console.log("Task Id", taskId);

  useEffect(() => {
    // Focus on the latest input field when a new input is added
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1].focus();
    }
  }, [subTasks]);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const fetchComments = async () => {
    try {
      const getCommentsResponse = await API.getComments(taskId);
      console.log("getCommentsResponse", getCommentsResponse);
      const data = getCommentsResponse?.data.comments;
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      const payload = { text: comment };
      const addCommentResponse = await API.addComment(taskId, payload);
      console.log("add comment response##############", addCommentResponse);
      setComments((prevComments) => [
        ...prevComments,
        addCommentResponse.data.comment,
      ]);
      setComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const manualTask = await API.getManualTask(taskId);
        const taskData = manualTask?.data.task;
        setTaskTitle(taskData.title || "");
        setTaskStatus(taskData.status || "");
        setTaskPriority(taskData.priority || "");
        setTaskETAUnit(taskData.ETAUnit || "");
        setTaskETATime(taskData.ETA || "");
        setTaskDeadline(dayjs(taskData.deadline));
        setTaskDescription(taskData.description || "");
        setSelectedAssignees(taskData.assignees || []);
        console.log("Manual task", taskData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityResponse = await API.getAtivityData(taskId);
        console.log("Activity^^^^^^^^^^^^^^", activityResponse?.data.activity);
        setActivities(activityResponse?.data.activity);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const assignee = await API.getInvitees();
        const data = assignee?.data.invitees;
        console.log("assignees------------", data);
        setAssignees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssignees();
  }, []);

  {
    /*
      Details : List of details fields
      1. Title. []
      2. Status : []
      3. Priority : []
      4. Created By.  - !
      5. Creator Name 
      6. Assignees, 
      7. invitees
      8. Subtasks
      9. ETA Unit : []
      10 ETA Time : []
      11. description : []
      12. Attachments ; []
      13 comments. []
       */
  }
  const handleAssigneeChange = (event) => {
    setSelectedAssignees(event.target.value);
  };

  // Save task basic information
  const handleSave = async () => {
    try {
      const payload = {
        title: taskTitle,
        status: taskStatus,
        priority: taskPriority,
        description: taskDescription,
        assignees: selectedAssignees,
        ETA: Number(taskETATime),
        ETAUnit: taskETAUnit,
        deadline: taskDeadline,
      };

      await API.updateManualTaskBasicInfo(taskId, payload);
      console.log("Task updated successfully");
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-4 m-2 bg-black text-white w-full p-2 rounded-lg shadow-md font-bold">
        <div className="text-xl text-bold">EDIT TASK</div>
      </div>
      <div className="flex flex-col p-4  gap-2 rounded-lg w-[90%] bg-gray-50 shadow-md">
        {/* ============================================================================================================================ */}
        <textarea
          placeholder="Enter the title"
          className="w-full h-16 text-5xl font-bold bg-gray-50 placeholder-gray-600 focus:outline-none"
          rows="1"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        {/* ============================================================================================================================ */}
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="assignees-multi-select">Assignees</label>
          <Select
            labelId="assignee-multi-select-label"
            id="assignees-multi-select"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            displayEmpty
            multiple
            value={selectedAssignees}
            onChange={handleAssigneeChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em style={{ color: "#888" }}>Select Assignees</em>;
              }
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip
                      key={value}
                      label={value}
                      style={{
                        backgroundColor: colors[index % colors.length], // Use dynamic color
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </Box>
              );
            }}
          >
            <MenuItem disabled value="">
              <em>Select Assignees</em>
            </MenuItem>
            {assignees.map((assignee) => (
              <MenuItem
                key={assignee._id}
                value={`${assignee.firstName} ${assignee.lastName}`}
              >
                {assignee.firstName} {assignee.lastName} ({assignee.email})
              </MenuItem>
            ))}
          </Select>
        </div>
        {/* ============================================================================================================================ */}

        <div className="flex flex-col w-full gap-1">
          <label>Status</label>
          <Select
            labelId="status-select-label"
            id="status-select"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            displayEmpty
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            renderValue={(selected) =>
              selected ? (
                <Chip
                  label={selected}
                  style={{
                    backgroundColor: statusColors[selected],
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ) : (
                "backlog"
              )
            }
          >
            <MenuItem
              value="backlog"
              style={{ backgroundColor: statusColors["backlog"] }}
            >
              Backlog
            </MenuItem>
            <MenuItem
              value="in-progress"
              style={{ backgroundColor: statusColors["in-progress"] }}
            >
              In Progress
            </MenuItem>
            <MenuItem
              value="completed"
              style={{ backgroundColor: statusColors["completed"] }}
            >
              Completed
            </MenuItem>
            <MenuItem
              value="on-hold"
              style={{ backgroundColor: statusColors["on-hold"] }}
            >
              On Hold
            </MenuItem>
            <MenuItem
              value="cancelled"
              style={{ backgroundColor: statusColors["cancelled"] }}
            >
              Cancelled
            </MenuItem>
            <MenuItem
              value="blocked"
              style={{ backgroundColor: statusColors["blocked"] }}
            >
              Blocked
            </MenuItem>
            <MenuItem
              value="archived"
              style={{ backgroundColor: statusColors["archived"] }}
            >
              Archived
            </MenuItem>
          </Select>
        </div>
        {/* ============================================================================================================================ */}
        <div className="flex flex-col w-full gap-1">
          <label>Priority</label>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                <Chip
                  label={selected}
                  style={{
                    backgroundColor: priorityColors[selected],
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ) : (
                "Select Priority"
              )
            }
          >
            <MenuItem
              value="Low"
              style={{ backgroundColor: priorityColors.Low }}
            >
              Low
            </MenuItem>
            <MenuItem
              value="Medium"
              style={{ backgroundColor: priorityColors.Medium }}
            >
              Medium
            </MenuItem>
            <MenuItem
              value="High"
              style={{ backgroundColor: priorityColors.High }}
            >
              High
            </MenuItem>
            <MenuItem
              value="Urgent"
              style={{ backgroundColor: priorityColors.Urgent }}
            >
              Urgent
            </MenuItem>
          </Select>
        </div>
        {/* ============================================================================================================================ */}

        <div className="flex flex-row justify-between align-center">
          <div className="flex flex-row gap-2">
            <label className="mr-2">ETA </label>
            <Select
              labelId="eta-select-label"
              id="eta-select"
              className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base max-w-[150px]"
              displayEmpt
              value={taskETAUnit}
              onChange={(e) => setTaskETAUnit(e.target.value)}
            >
              <MenuItem value="minutes">Minutes</MenuItem>
              <MenuItem value="hours">Hours</MenuItem>
            </Select>
            <Input
              type="number"
              placeholder="ETA"
              name="eta"
              className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base max-w-[200px]"
              value={taskETATime}
              onChange={(e) => setTaskETATime(e.target.value)}
              inputProps={{
                style: {
                  appearance: "none", // Remove default styling
                  MozAppearance: "textfield", // Remove spinners in Firefox
                  WebkitAppearance: "none", // Remove spinners in WebKit browsers
                },
              }}
              // value={etaTime}
              // onChange={(e) => setEtaTime(Math.max(0, e.target.value))}
            />
          </div>
          <div className="flex flex-row gap-2">
            <label className="mr-2">Deadline</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={taskDeadline}
                  //
                  onChange={(date) => setTaskDeadline(date)}
                  label=""
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "32px", // Adjust the height
                      fontSize: "0.875rem", // Adjust font size for consistency
                      padding: "0 8px", // Reduce padding to fit the height
                      overflow: "hidden", // Prevent scroll bar appearance
                      border: "1px solid black", // Add black border
                      borderRadius: "4px", // Optional: adjust border radius
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
                      "&:hover, &:focus-within": {
                        outline: "none", // Remove the outline
                        borderColor: "black", // Keep the border black when focused
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)", // Enhance shadow on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.75rem", // Adjust label size
                      transform: "translate(14px, 10px) scale(1)", // Adjust label position
                      "&.Mui-focused": {
                        transform: "translate(14px, -6px) scale(0.75)", // Adjust label when focused
                        color: "black", // Label color when focused
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.2rem", // Adjust calendar icon size
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border (since it's handled by InputBase)
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        {/* ============================================================================================================================ */}
        <div className="mt-4 p-4">
          <textarea
            placeholder="Type your task's description....."
            className=" w-full h-16 text-lg border-2 border-gray-600 p-4 rounded-lg focus:outline-none"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <div className="flex  align-center justify-center">
          <sapn
            className="bg-black text-white p-2 w-1/3 text-center rounded-xl cursor-pointer "
            onClick={handleSave}
          >
            SAVE INFORMATION
          </sapn>
        </div>
        {/* ============================================================================================================================ */}

        {/* Sub Tasks */}
        <SubTask taskId={taskId} />

        {/* ============================================================================================================================ */}

        <Box
          sx={{
            width: "100%",
            typography: "body1",
            bgcolor: "#e3f2fd",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            p: 2, // Add padding for better appearance
            borderRadius: 2, // Optional: Adds rounded corners
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="task tabs"
          >
            <Tab label="Comment" />
            <Tab label="Activity" />
          </Tabs>

          {activeTab === 0 && (
            <Box  sx={{ p: 2, maxHeight: "200px", overflowY: "auto" }}>
              <Typography variant="h6">Comments</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                disabled={!comment.trim()}
              >
                Add Comment
              </Button>
              <List>
                {comments.map((c, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    {/* First Row: Avatar and Comment */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        {c.authorName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {c.text}
                      </Typography>
                    </Box>

                    {/* Second Row: Author Name and Time */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {c.authorName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formatDate(c.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ p: 2, maxHeight: "200px", overflowY: "auto" }}>
              <Typography variant="h6">Activity</Typography>
              <List>
                {activities
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by latest activity
                  .map((activity, index) => (
                    <ListItem key={index}>
                      <Typography variant="body2">
                        <b>{activity.updatedByName || "Unknown User"}</b>{" "}
                        updated: "{activity.message}" at{" "}
                        <i>{formatDate(activity.updatedAt)}</i>
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};
export default page;
