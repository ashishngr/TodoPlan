"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Task from "@/app/components/Task";
import Filters from "@/app/components/Filters";
import { TfiPlus } from "react-icons/tfi";
import TaskStatusCard from "@/app/components/TaskStatusCard";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { GrClose } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

import Typography from '@mui/material/Typography';
import TaskCard from "@/app/components/TaskCard";

import RequireAuth from "@/app/common/RequireAuth";
import API from "@/app/common/api";
import Header from "@/app/components/Header";


const page = () => {
  const [date, setDate] = useState(Date);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [etaType, setEtaType] = useState('');
  const [eta, setEta] = useState(Number);
  const [completedAt, setCompletedAt] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

   // Reset fields to initial state
   const resetFields = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
    setEta("");
    setEtaType("");
    setCompletedAt(null);
    setDeadline(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async(e) =>{
    console.log("------")
    e.preventDefault();
    setIsLoading(true); 
    if (isNaN(eta) || eta <= 0) {
      alert("Please enter a valid ETA value");
      return;
    }
    try {
      const formData = {
        title, 
        description, 
        priority, 
        status, 
        ETA: eta, 
        ETAUnit : etaType, 
        deadline, 
        description, 
        completionDate: completedAt
      }
      const response = await API.createTask(formData); 
      console.log("response", response)
      if(response.status === 200){
        setSuccessMessage("Task created successfully");
        resetFields()
      }
      console.log("response", response)
    } catch (error) {
      console.log(error)
      setErrorMessage("Failed to create task. Please try again.");
      resetFields(); // Reset fields even on failure
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <RequireAuth>
    <div className="flex flex-col justify-center">
      {/* Top Header */}
      <Header />
      {/* Header */}
       <Typography variant="h6">Notionize</Typography>
       <Typography variant="p">Streamline your tasks, elevate your notes.</Typography>

       {/* Task Section */}
       <TaskCard />
    </div>
    </RequireAuth>
   
  );
};

export default page;
