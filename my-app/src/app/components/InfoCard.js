import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"; 
import { MdDone, MdBlock } from "react-icons/md"; // Complete & Blocked icons
import { IoIosDocument } from "react-icons/io"; // Notes icon
import { FaTasks, FaSpinner } from "react-icons/fa"; // Backlog & In-Progress icons

const InfoCards = ({ title, number }) => {
  let icon, bgColor, gradient;

  // Determine icon, background color, and gradient based on title
  switch (title) {
    case "In-Progress":
      icon = <FaSpinner size={24} className="text-yellow-600 animate-spin" />;
      bgColor = "bg-yellow-100";
      gradient = "from-yellow-400 to-yellow-600";
      break;
    case "Complete Tasks":
      icon = <MdDone size={24} className="text-green-600" />;
      bgColor = "bg-green-100";
      gradient = "from-green-400 to-green-600";
      break;
    case "Total Notes":
      icon = <IoIosDocument size={24} className="text-blue-600" />;
      bgColor = "bg-blue-100";
      gradient = "from-blue-400 to-blue-600";
      break;
    case "Backlog Tasks":
      icon = <FaTasks size={24} className="text-orange-600" />;
      bgColor = "bg-orange-100";
      gradient = "from-orange-400 to-orange-600";
      break;
    case "Blocked Tasks":
      icon = <MdBlock size={24} className="text-red-600" />;
      bgColor = "bg-red-100";
      gradient = "from-red-400 to-red-600";
      break;
    default:
      icon = <FaTasks size={24} className="text-gray-600" />;
      bgColor = "bg-gray-100";
      gradient = "from-gray-400 to-gray-600";
      break;
  }

  return (
    <Card 
      className={`w-[220px] bg-gradient-to-br ${gradient} shadow-lg rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
      }}
    >
      <CardHeader className="flex justify-center">
        {/* Circular Icon Container */}
        <div className="p-3 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:rotate-6 hover:scale-110">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center mt-2">
        {/* Number with slight shadow for depth */}
        <div className="text-3xl font-extrabold text-white drop-shadow-md">
          {number}
        </div>
        {/* Title */}
        <span className="text-lg font-medium text-white mt-1">{title}</span>
      </CardContent>
    </Card>
  );
};

export default InfoCards;
