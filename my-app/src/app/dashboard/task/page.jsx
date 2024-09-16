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

import RequireAuth from "@/app/common/RequireAuth";

const page = () => {
  const [date, setDate] = useState(Date);
 

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
            <AlertDialogTitle>Create A Task</AlertDialogTitle>
            <AlertDialogDescription>
              By filling the required information you can create a task
              <div className="flex flex-col mt-6">
                <label htmlFor="title">Title:</label>
                <Input id="title" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <Textarea id="description" />
              </div>
              <div className="flex flex-row flex-wrap justify-between mt-3">
                <Select className="w-30">
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="banana">Low</SelectItem>
                      <SelectItem value="blueberry">Medium</SelectItem>
                      <SelectItem value="grapes">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select className="w-1/2">
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="apple">In-Progress</SelectItem>
                      <SelectItem value="banana">Blocked</SelectItem>
                      <SelectItem value="blueberry">Backlock</SelectItem>
                      <SelectItem value="grapes">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row flex-wrap gap-2 mt-6">
                <div className="flex flex-col ">
                  <label htmlFor="eta">ETA: In minutes</label>
                  <Input id="eta" />
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
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* </div> */}
    </div>
    </RequireAuth>
   
  );
};

export default page;
