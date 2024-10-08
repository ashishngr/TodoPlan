import React from 'react'; 
import { HiArrowNarrowRight } from "react-icons/hi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"; 

const data = [{
    "S.No" : "1", 
    "Titile" : "Title", 
    "Priority" : "High", 
    "Status" : "Activity",
    "ETA" : "30 Mins", 
    "Created At" : "Today", 
    "Deadline": "Today" 

}]
const Task = () => {
  return (
    <div className='flex flex-row flex-wrap grow max-w-full bg-white p-5 shadow-md border-1 border-inherit rounded-lg justify-between items-center'>
        <span className='bg-gray-50 p-2  shadow-md border rounded-full '>S.No</span>
        <span>Title</span>
        <span>Priority</span>
        <span>ETA</span>
        <span>Created At</span>
        <span>Deadline</span>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className='bg-gray-50 p-3  shadow-md border rounded-full justify-center content-center cursor-pointer '><HiArrowNarrowRight /></div>
                </TooltipTrigger>
                <TooltipContent>Taks Details</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  )
}

export default Task