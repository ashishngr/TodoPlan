import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Task from '@/app/components/Task' 
import { TfiPlus } from "react-icons/tfi";
import { ScrollArea } from "@/components/ui/scroll-area"


const page = () => {
  return (
    <div className='flex justify-center p-10'> 
    <Card className="w-full h-[70vh]">
      <CardHeader className="items-center">
          <CardTitle>Task List</CardTitle>
          <CardDescription>List Of Tasks Created By Your.</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea  className="flex flex-col gap-2  h-[50vh]">
        <div className='flex flex-col gap-2 '>
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
    {/* Add Task Icon */}
    <div className='absolute bottom-10 right-20 bg-white p-4 shadow-md border-1 border-inherit rounded-lg'>
      <TfiPlus size={35}/>
    </div>
    </div>
  )
}

export default page