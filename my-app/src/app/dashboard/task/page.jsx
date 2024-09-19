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
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { GrClose } from "react-icons/gr";

import RequireAuth from "@/app/common/RequireAuth";
import API from "@/app/common/api";


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
       <div className="flex flex-col justify-center p-10">
       <div className="border-2 rounded-lg p-4 shadow-md bg-white mb-5">
            <Filters filters={["SortBy", "SearchById", "SearchByPriority", "searchByCreatedAt", "SearchByStatus"]}
            />
        </div>
      <Card className="w-full h-[70vh]">
        <CardHeader className="items-center">
          <CardTitle>Task List</CardTitle>
          <CardDescription>List Of Tasks Created By Your.</CardDescription>
        </CardHeader>

        <CardContent> 
          <ScrollArea className="flex flex-col gap-2  h-[50vh]">
            <div className="flex flex-col gap-2 ">
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      {/* Create Task  */}
      {/* Add Task Icon */}
      {/* <div className='absolute bottom-10 right-20  p-4 shadow-md border-1 border-inherit rounded-lg'> */}
      <AlertDialog>
        <AlertDialogTrigger className="bg-white absolute bottom-10 right-20 p-4 shadow-lg border-1 rounded-lg">
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TfiPlus size={35} />
              <TooltipContent>Create A New Task</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
          </TooltipProvider>
        
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>

            <div className="flex justify-end">
            <AlertDialogCancel><GrClose /></AlertDialogCancel>
            </div>
              <div className="flex flex-col items-center justify-center">
              <AlertDialogTitle>Create A Task</AlertDialogTitle>  
              <AlertDialogDescription>
              By filling the required information you can create a task
              </AlertDialogDescription>
              </div>
           
           
            
              <form  onSubmit={handleSubmit}>
              <div className="flex flex-col mt-6">
                <label htmlFor="title">Title:</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="flex flex-row flex-wrap justify-between mt-3">
                <Select className="w-30" value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select className="w-1/2" value={status} onValueChange={setStatus} >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="in-progress">In-Progress</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="backlog">Backlock</SelectItem>
                      <SelectItem value="completed">Done</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col mt-6">
                <label htmlFor="attachment">Attachment:</label>
                <Input id="attachment" />
              </div>
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 flex-grow">
                  <lable htmlFor="eta">Select ETA Unit</lable>
                <Select className="w-30" value={etaType} onValueChange={setEtaType}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select ETA Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>ETA </SelectLabel>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                 
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <label htmlFor="eta">ETA</label>
                  <Input id="eta" type="number" placeholder="" required value={eta} onChange={(e) => setEta(e.target.value)}  
                  />
                </div>
              </div>

              <div className="flex flex-row flex-wrap gap-2 mt-6">
                <div className="flex flex-col ">
                  <label htmlFor="eta">Completed At</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {completedAt ? format(completedAt, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={completedAt} 
                        onSelect={setCompletedAt}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col flex-wrap ">
                  <div>Deadline</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div> 
              <div className="flex flex-col justify-center mt-2 gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
              </form>
            
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            {/* <AlertDialogAction type="submit" disabled={isLoading} >Submit</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* </div> */}
    </div>
    </RequireAuth>
   
  );
};

export default page;
