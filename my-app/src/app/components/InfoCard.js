import React from 'react'; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { MdDone, MdOutlineTask } from "react-icons/md"; // Complete & In-progress icons
import { IoIosDocument } from "react-icons/io"; // Notes icon

const InfoCards = ({title, number}) => {
  let icon, bgColor;
  // Determine icon and background color based on title
  switch (title) {
    case "In-Progress":
      icon = <MdOutlineTask size={22} className="text-yellow-600" />;
      bgColor = "bg-yellow-100";
      break;
    case "Complete Tasks":
      icon = <MdDone size={22} className="text-green-600" />;
      bgColor = "bg-green-100";
      break;
    case "Toatal Notes":
      icon = <IoIosDocument size={22} className="text-blue-600" />;
      bgColor = "bg-blue-100";
      break;
    default:
      icon = <MdOutlineTask size={28} className="text-gray-600" />;
      bgColor = "bg-gray-100";
      break;
    }

  return (
    <Card className={`w-[220px]  ${bgColor} shadow-md rounded-md`}>
    <CardHeader className="">
      {/* Icon */}
      <div className="p-3 bg-white max-w-12">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      {/* Number */}
      <div className="text-2xl font-extrabold text-gray-900">
        {number}
      </div>
      <span>{title}</span>
    </CardContent>
  </Card>
  )
}

export default InfoCards