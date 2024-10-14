import React, { useState } from "react";
import { DialogContent, IconButton } from "@mui/material";
import { Button } from "@/components/ui/button";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import { Input } from "@/components/ui/input";
import { Select, MenuItem, Chip } from "@mui/material"; 

import API from "../common/api";

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

const TaskDialog = ({ open, onClose }) => {
  const [status, setStatus] = useState("backlog");
  const [priority, setPriority] = useState("Medium");
  const [etaUnit, setEtaUnit] = useState("minutes");
  const [etaTime, setEtaTime] = useState(null);
  const [title, setTitle] = useState("");

  const handleStatusChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleEtaUnitChange = (event) => {
    setEtaUnit(event.target.value);
  };
  
  const handleCreateManualTask = async(e) =>{
    e.preventDefault(); 
    try {
        const payload = {
            title,
            status,
            priority,
            ETAUnit: etaUnit,
            ETA : etaTime,
        };
        const newTask  = await API.createManualTask(payload); 
        if(newTask.status === 200){
            setTitle(""); // Reset title to an empty string
            setStatus("backlog"); // Reset status to default "backlog"
            setPriority("Medium"); // Reset priority to default "Medium"
            setEtaUnit("hour"); // Reset ETA unit to "hour"
            setEtaTime(""); // Reset ETA time to an empty string
            // Close the dialog (popup)
            onClose();
        }

    } catch (error) {
      console.log(error)
    }
  }
  const isSaveDisabled = !title || !etaTime;

  return (
    <div>
      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white w-1/2 rounded-lg shadow-xl">
            <div className="flex items-center justify-between border-b p-4 border-gray-200 pb-2">
              {/* Dialog Title */}
              <h2 className="text-lg font-semibold">TASK</h2>

              {/* Close Button */}
              <IconButton
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </div>
            {/* Dialog Content */}
            <DialogContent>
              <div className="flex justify-center">
                <div className="flex flex-col gap-4 w-full ">
                  <textarea
                    placeholder="Enter the title"
                    className="w-full h-12 text-3xl font-bold placeholder-gray-600 border-b-2 border-gray-700 focus:outline-none focus:border-blue-500"
                    rows="1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="flex items-center gap-4">
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      className="w-1/3 border-b-2 border-gray-300 focus:border-gray-500 h-10"
                      onChange={handleStatusChange}
                      value={status}
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
                    <Select
                      labelId="priority-select-label"
                      id="priority-select"
                      className="w-1/3 border-b-2 border-gray-300 focus:border-gray-500 h-10"
                      onChange={handlePriorityChange}
                      value={priority}
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
                    <div className="flex items-center ">
                      <label className="mr-2">ETA </label>
                      <Select
                        labelId="eta-select-label"
                        id="eta-select"
                        className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base"
                        displayEmpt
                        value={etaUnit}
                        onChange={handleEtaUnitChange}
                       
                      >
                        <MenuItem value="minutes">Minutes</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                      </Select>
                      <Input
                        type="number"
                        placeholder="ETA"
                        name="eta"
                        className="border-b-2 border-gray-300 focus:border-gray-500 h-10 text-base ml-2"
                        inputProps={{
                          style: {
                            appearance: "none", // Remove default styling
                            MozAppearance: "textfield", // Remove spinners in Firefox
                            WebkitAppearance: "none", // Remove spinners in WebKit browsers
                          },
                        }}
                        value={etaTime}
                        onChange={(e) => setEtaTime(Math.max(0, e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCreateManualTask} disabled={isSaveDisabled}>Save Task</Button>
            </DialogActions>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDialog;
