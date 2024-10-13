"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, MenuItem, Chip } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";

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

const page = () => {
  const [subTasks, setSubTasks] = useState([""]);
  const [activeTab, setActiveTab] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState([
    {
      time: "2024-10-12 14:30",
      user: "John Doe",
      update: "Task title changed",
    },
    {
      time: "2024-10-11 09:15",
      user: "Jane Smith",
      update: "Added a new subtask",
    },
  ]);
  const inputRefs = useRef([]);

  const params = useParams();
  const taskId = params.taskId;
  console.log("Task Id", taskId);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, ""]);
  };
  const handleInputChange = (index, value) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index] = value;
    setSubTasks(updatedSubTasks);
  };
  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" && subTasks[index].trim() !== "") {
      e.preventDefault();
      handleAddSubTask();
    }
  };
  useEffect(() => {
    // Focus on the latest input field when a new input is added
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1].focus();
    }
  }, [subTasks]);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([
        ...comments,
        { text: comment, time: new Date().toLocaleString() },
      ]);
      setComment("");
    }
  };

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
  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="flex flex-col p-4 w-1/2 gap-2 rounded-lg shadow-2xl">
        <textarea
          placeholder="Enter the title"
          className="w-full h-16 text-5xl font-bold placeholder-gray-600 focus:outline-none"
          rows="1"
        />
        <div className="flex flex-col w-full gap-1">
          <label>Owner</label>
          <Select
            labelId="priority-select-label"
            id="Assignees"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            // onChange={handlePriorityChange}
            // value={priority}
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
                "Assignees"
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
        <div className="flex flex-col w-full gap-1">
          <label>Status</label>
          <Select
            labelId="status-select-label"
            id="status-select"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            // onChange={handleStatusChange}
            // value={status}
            displayEmpty
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
        <div className="flex flex-col w-full gap-1">
          <label>Priority</label>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            className="border-b-2 border-gray-300 focus:border-gray-500 h-10"
            // onChange={handlePriorityChange}
            // value={priority}
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
        <div className="flex flex-row justify-between align-center">
          <div className="flex flex-row gap-2">
            <label className="mr-2">ETA </label>
            <Select
              labelId="eta-select-label"
              id="eta-select"
              className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base max-w-[150px]"
              displayEmpt
              // value={etaUnit}
              // onChange={handleEtaUnitChange}
            >
              <MenuItem value="minutes">Minutes</MenuItem>
              <MenuItem value="hours">Hours</MenuItem>
            </Select>
            <Input
              type="number"
              placeholder="ETA"
              name="eta"
              className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base max-w-[200px]"
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
        <Separator className="w-full mt-2" />
        <div className="mt-4 p-4">
          <textarea
            placeholder="Type your task's description....."
            className=" w-full h-16 text-lg border-none  focus:outline-none"
          />
        </div>
        {/* Sub Tasks */}
        <div className="min-h-[250px]">
          <Typography variant="h6" className="mb-1">
            Add SubTasks
          </Typography>
          {/* <div className="flex flex-row gap-1">
            <span className="text-lg">1.</span> <input className="w-full text-lg font-bold border-b-2 focus:outline-none"/> <span className="p-2 cursor-pointer bg-gray-200 rounded-full"><IoIosAddCircleOutline size={22}/></span>
          </div> */}
          {subTasks.map((subTask, index) => (
            <div key={index} className="flex flex-row gap-1 items-center mb-2">
              <span className="text-lg">{index + 1}.</span>
              <input
                className="w-full text-lg font-bold border-b-2 focus:outline-none"
                value={subTask}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              />
              {index === subTasks.length - 1 && (
                <span
                  className={`p-2 cursor-pointer bg-gray-200 rounded-full ${
                    subTask.trim() === "" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => subTask.trim() !== "" && handleAddSubTask()}
                >
                  <IoIosAddCircleOutline size={22} />
                </span>
              )}
            </div>
          ))}
        </div>
        <Separator className="w-full mt-2" />

        <Box sx={{ width: "100%", 
          typography: "body1", 
          bgcolor: 'lightgray', 
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
          p: 2, // Add padding for better appearance
          borderRadius: 2 // Optional: Adds rounded corners
          }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="task tabs"
          >
            <Tab label="Comment" />
            <Tab label="Activity" />
          </Tabs>

          {activeTab === 0 && (
            <Box sx={{ p: 2 }}>
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
                  <ListItem key={index}>
                    <Typography variant="body2">
                      {c.text} - <i>{c.time}</i>
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Activity</Typography>
              <List>
                {activities.map((activity, index) => (
                  <ListItem key={index}>
                    <Typography variant="body2">
                      <b>{activity.user}</b> updated: "{activity.update}" at{" "}
                      <i>{activity.time}</i>
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
