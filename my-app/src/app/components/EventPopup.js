import React from "react";
import { Separator } from "@/components/ui/separator";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/navigation';

const EventPopup = ({ event, onClose }) => {
  if (!event) return null;
  console.log("event popup data", event);
  const router = useRouter();
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-orange-600";
      case "Urgent":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };
  const handleEditClick = () => {
    // Redirect user to the edit task page
    router.push(`/dashboard/task/${event.id}`);
  
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded shadow-lg max-w-md w-full">
        <div className="flex justify-center p-2">
          <h2 className="text-lg font-semibold">{event.title}</h2>
        </div>
        <Separator className="bg-gray-700 h-[1px]" />
        <div className="flex flex-col justify-center p-4 gap-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg shadow-sm">
            <Typography variant="h6" className="font-semibold text-gray-800">
              {event.creatorName}
            </Typography>
            <span className="text-gray-400">|</span>
            <Typography variant="body1" className="text-blue-600 underline">
              {event.creatorEmail}
            </Typography>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
              <span className="text-sm font-semibold text-gray-500">
                Status
              </span>
              <span className="text-base font-medium text-gray-800">
                {event.status}
              </span>
            </div>
            <div className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
              <span className="text-sm font-semibold text-gray-500">
                Priority
              </span>
              <span
                className={`text-base font-medium ${getPriorityColor(
                  event.priority
                )}`}
              >
                {event.priority}
              </span>
            </div>
            <div className="col-span-2 flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
              <span className="text-sm font-semibold text-gray-500">
                Description
              </span>
              <span className="text-base text-gray-800">
                {event.description || "No Description"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={handleEditClick} // Define this function to handle the edit functionality
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-4 py-2 rounded-md transition-all duration-200 max-w-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
