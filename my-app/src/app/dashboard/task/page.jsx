"use client";
import React, { useState, useEffect, useRef } from "react";
import TaskCard from "@/app/components/TaskCard";
import { IoAdd } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RequireAuth from "@/app/common/RequireAuth";
import Header from "@/app/components/Header";
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TaskDialog from "@/app/components/TaskDialog";


import API from "@/app/common/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '40%', // Set your desired width here, for example 80% of the viewport
    maxWidth: '400px', // You can add a max-width to limit it on larger screens
  },
}));

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const availableFilters = [
    "Priority",
    "Status",
    "SortBy",
    "Assignee",
    "DueDate",
  ];
  const [open, setOpen] = React.useState(false); 
  const [openTaskDialog, setOpenTaskDialog] = useState(false)
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter) => {
    // Toggle filter selection
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleRemoveChip = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

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

  const handleTaskDialogOpen = () =>{
    setOpen(false)
    setOpenTaskDialog(true);
  }
  const handleTaskDialogClose = () =>{
    setOpenTaskDialog(false)
  }


  return (
    <RequireAuth>
      <div className="flex flex-col justify-center">
        {/* Headers */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          {/* Top Header */}
        <Header className=" bg-white shadow-md"/>
        {/* Header 2*/}
        <div className="flex flex-row justify-between p-4 border-b border-gray-300">
          {/* Filters */}
          <div 
          className="relative">
            <Button onClick={toggleDropdown} className="bg-gray-500">
              {" "}
              Add Filters{" "}
              <span className="ml-2">
                {" "}
                <IoAdd size={22} />{" "}
              </span>{" "}
            </Button>
          </div>
          {/* Dropdown */}
          {isOpen && (
            <div 
            ref={dropdownRef}
            className="absolute z-10 mt-9 bg-white shadow-md border border-gray-300  rounded-md">
              {availableFilters.map((filter) => (
                <div
                  key={filter}
                  className="flex items-center space-x-2 p-5 hover:bg-gray-100 "
                >
                  <input
                    type="checkbox"
                    id={filter}
                    checked={selectedFilters.includes(filter)}
                    onChange={() => handleFilterSelect(filter)}
                    className="w-4 h-4 text-black bg-gray-500 border-gray-300 rounded focus:ring-gray-500 cursor-pointer"
                  />
                  <label
                    htmlFor={filter}
                    className="text-sm font-medium leading-none"
                  >
                    {filter}
                  </label>
                </div>
              ))}
              <div className="p-2 text-center border-t border-gray-300">
              <Button onClick={() => setSelectedFilters([])} className="text-white shadow-lg" >
                Clear Filters
              </Button>
            </div>
            </div>
          )}
          {/* Box displaying selected filters as chips */}
          <div 
          className="mt-4 flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemoveChip(filter)}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {/* Search  */}
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search any task by entering there title"
            />
            <Button type="submit">Search</Button>
          </div>
        </div>
        </div>
        
        {/* Add Crad Button */}
        <div className="flex justify-center mt-2">
          <Button className="font-bold text-xl"  onClick={handleClickOpen}>Create Task {" "}<span className="ml-2">
                {" "}
                <IoAdd size={30} />{" "}
              </span>{" "} 
          </Button>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2  }} id="customized-dialog-title">
          CREATE TASK
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
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
         
        {/* Task Sections */}
        <div className="flex flex-row justify-center gap-4 p-10 flex-wrap">
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
           <TaskCard />
        </div>
       
      </div>
    </RequireAuth>
  );
};

export default page;
