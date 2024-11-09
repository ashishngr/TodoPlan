"use client";
import React, { useState, useEffect, useRef } from "react";
import TaskCard from "@/app/components/TaskCard";
import { IoAdd } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RequireAuth from "@/app/common/RequireAuth";
import Header from "@/app/components/Header";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TaskDialog from "@/app/components/TaskDialog";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

import API from "@/app/common/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "40%", // Set your desired width here, for example 80% of the viewport
    maxWidth: "400px", // You can add a max-width to limit it on larger screens
  },
}));
const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 100,
  marginRight: theme.spacing(4),
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    borderBottom: `2px solid ${theme.palette.primary.main}`, // Underline for selected tab
  },
  "&:hover": {
    color: theme.palette.primary.dark, // Change color on hover
  },
}));

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [tabValue, setTabValue] = useState("Manual");
  const [taskDetails, setTaskDetails] = useState([]);

  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskDialogOpen = () => {
    setOpen(false);
    setOpenTaskDialog(true);
  };
  const handleTaskDialogClose = () => {
    setOpenTaskDialog(false);
  };

  useEffect(() => {
    const fetchTasks = async (taskType) => {
      try {
        const response = await API.getAllTask({ params: { taskType } }); // Call the API to get all tasks
        console.log("@#!@###################################", response?.data.data)
        if (response.status === 200) {
          setTaskDetails(response?.data.data); // Set the task data in state
        } else {
          console.log("Failed to fetch tasks", response);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks(tabValue);
  }, [tabValue]);


  const handleTabChange = (newValue) => {
    setTabValue(newValue); // Update the tab value
  };

  return (
    <RequireAuth>
      <div className="flex flex-col justify-center">
        {/* Headers */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          {/* Top Header */}
          <Header className=" bg-white shadow-md" />
          {/* Header 2*/}

          <div className="flex flex-row justify-between p-4 border-b border-gray-300">
            {/* ADD NEW TASK COMP{ONENT} */}
            <div className="flex justify-center mt-2">
              <Button className="font-bold text-xl" onClick={handleClickOpen}>
                Create Task{" "}
                <span className="ml-2">
                  {" "}
                  <IoAdd size={30} />{" "}
                </span>{" "}
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  CREATE TASK
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <div className="flex flex-col flex-grow gap-2">
                    <Button onClick={handleTaskDialogOpen}>Manual Task</Button>
                    <Button>Google Task </Button>
                    <Button>Create with AI</Button>
                  </div>
                </DialogContent>
              </BootstrapDialog>
            </div>
            {/* Custom TaskDialog */}
            <TaskDialog open={openTaskDialog} onClose={handleTaskDialogClose} />
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Search any task by entering there title"
              />
              <Button type="submit">Search</Button>
            </div>
          </div>
        </div>

        {/* ================================================================================================================= */}

        {/* TODO : ADD Tabs for different kind of tasks - Manual , Google, AI */}
        <div className="flex flex-col justify-center mt-4">
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(event, newValue) => handleTabChange(newValue)}
                aria-label="lab API tabs example"
              >
                <Tab label="Manual Tasks" value="Manual" />
                <Tab label="Google Tasks" value="Google" />
                <Tab label="AI Tasks" value="AI" />
              </TabList>
            </Box>
            <TabPanel value="Manual">
              <div className="flex flex-row justify-center gap-4 p-10 flex-wrap">
                {taskDetails.length > 0 ? (
                  taskDetails.map((task) => (
                    <TaskCard key={task._id} task={task} /> // Pass each task object to TaskCard
                  ))
                ) : (
                  <p>No tasks available</p>
                )}
              </div>
            </TabPanel>
            <TabPanel value="Google">Comming Soon</TabPanel>
            <TabPanel value="AI">Comming Soon</TabPanel>
          </TabContext>
        </div>

        {/* Task Sections */}
      </div>
    </RequireAuth>
  );
};

export default page;
