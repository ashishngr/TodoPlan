"use client";

import React from 'react'; 
import RequireAuth from '@/app/common/RequireAuth';
import Header from "@/app/components/Header"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"; 
import { RocketIcon } from "@radix-ui/react-icons"
import InfoCard from '@/app/components/InfoCard';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';




const page = () => {
  return (
   <RequireAuth>
    <div className='flex flex-col'>
        {/* Header */}
        <Header className=" bg-white shadow-md"/>
    </div>
    {/* Welcome Note */}
    <div className='p-4'>
    <div>
    <Alert className=" p-4 rounded-lg shadow-md">
    <RocketIcon className="h-8 w-8 text-blue-500" />
    <AlertTitle className="text-lg font-bold text-blue-900 ml-4">Welcome to Notionize!</AlertTitle>
    <AlertDescription className="text-md text-gray-700 mt-2 ml-4">
        Supercharge your productivity with Notionize! Effortlessly manage tasks and notes, and even use AI to generate them. 
        Whether it's tracking your goals or organizing ideas, you're just a few clicks away from mastering your workflow.
        Start by creating tasks, organizing notes, and letting AI handle the rest!
    </AlertDescription>
    </Alert>
    </div>    
    {/* Cards And Button Section */}
    <div className='flex flex-row justify-between flex-wrap mt-4'>
        {/* Cards */}
        <div className='flex flex-row gap-6 flex-wrap'>
            <InfoCard title={"In-Progress"} number={12}/>
            <InfoCard title={"Complete Tasks"} number={10}/>
            <InfoCard title={"Toatal Notes"} number={20}/>
        </div>
        <div className='flex flex-col gap-3 p-4 w-[250px]'>
            <button className='bg-gray-300 text-black text-2xl font-extrabold p-4 rounded-md shadow-md cursor-pointer'><span><AddOutlinedIcon /></span>{" "}Add Task </button>
            <button className='bg-gray-300 text-black text-2xl font-extrabold p-4 rounded-md shadow-md cursor-pointer'><span><AddOutlinedIcon /></span>{" "}Add Notes</button>
        </div>
    </div>
    </div>
   </RequireAuth>
  )
}

export default page