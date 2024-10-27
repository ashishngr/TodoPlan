"use client";

import React, { useState, useEffect } from "react";
import RequireAuth from "@/app/common/RequireAuth";
import Header from "@/app/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import InfoCard from "@/app/components/InfoCard";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TableCards from "@/app/components/TableCards";
import NotesTableCard from "@/app/components/NotesTableCard";
import TaskDialog from "@/app/components/TaskDialog";
import API from "@/app/common/api";

const page = () => {
  const [toadyTask, setTodayTask] = useState([]);
  const [inprogressTask, setInprogressTask] = useState([]);
  const [inprogressTaskCount, setInprogressTaskCount] = useState();
  const [backlogTaskCount, setBacklogTaskCount] = useState();
  const [doneTasksCount, setDoneTaskCount] = useState();
  const [blockedTaskCount, setBlockedTaskCount] = useState();
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.getUserHomePageInfo();
        console.log("----------------------", response.data);
        setTodayTask(response.data.todaysTasks || []);
        setInprogressTask(response.data.inProgressTaskList || []);
        setInprogressTaskCount(response.data.inProgressTasks || 0);
        setBacklogTaskCount(response.data.backlogTasks || 0);
        setDoneTaskCount(response.data.doneTasks || 0);
        setBlockedTaskCount(response.data.blockedTasks || 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleTaskDialogOpen = () => {
    // setOpen(false);
    setOpenTaskDialog(true);
  };
  const handleTaskDialogClose = () => {
    setOpenTaskDialog(false);
  };

  return (
    <RequireAuth>
      <div className="flex flex-col">
        {/* Header */}
        <Header className=" bg-white shadow-md" />
      </div>
      {/* Welcome Note */}
      <div className="p-4">
        <div>
          <Alert className=" p-4 rounded-lg shadow-md">
            <RocketIcon className="h-8 w-8 text-blue-500" />
            <AlertTitle className="text-lg font-bold text-blue-900 ml-4">
              Welcome to Notionize!
            </AlertTitle>
            <AlertDescription className="text-md text-gray-700 mt-2 ml-4">
              Supercharge your productivity with Notionize! Effortlessly manage
              tasks and notes, and even use AI to generate them. Whether it's
              tracking your goals or organizing ideas, you're just a few clicks
              away from mastering your workflow. Start by creating tasks,
              organizing notes, and letting AI handle the rest!
            </AlertDescription>
          </Alert>
        </div>
        {/* Cards And Button Section */}
        <div className="flex flex-row justify-between flex-wrap mt-4">
          {/* Cards */}
          <div className="flex flex-row gap-6 flex-wrap">
            <InfoCard title={"In-Progress"} number={inprogressTaskCount} />
            <InfoCard title={"Complete Tasks"} number={doneTasksCount} />
            <InfoCard title={"Backlog Tasks"} number={backlogTaskCount} />
            <InfoCard title={"Blocked Tasks"} number={blockedTaskCount} />
            <InfoCard title={"Toatal Notes"} number={20} />
          </div>
          <div className="flex gap-4 p-4 w-full  max-w-md">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold py-3 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl" onClick={handleTaskDialogOpen}>
              <AddOutlinedIcon className="text-2xl" />
              Add Task
            </button>

            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg font-semibold py-3 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <AddOutlinedIcon className="text-2xl" />
              Add Notes
            </button>
          </div>
          <TaskDialog open={openTaskDialog} onClose={handleTaskDialogClose} />
        </div>
        {/* Tables */}
        <div className="flex flex-row gap-6 mt-3 flex-wrap ">
          <TableCards
            tableTitle={"Todays Tasks"}
            number={toadyTask.length}
            description={" A list of your today's tasks."}
            tasks={toadyTask}
          />

          <TableCards
            tableTitle={"In-Progress Tasks"}
            number={inprogressTask.length}
            description={" A list of your inprogress tasks."}
            tasks={inprogressTask}
          />
          <NotesTableCard title={"Latest Notes"} number={"9"} />
        </div>
      </div>
    </RequireAuth>
  );
};

export default page;
