"use client";
import React, { useState, useEffect } from "react";
import RequireAuth from "@/app/common/RequireAuth";
import Header from "@/app/components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TaskDialog from "@/app/components/TaskDialog";

import API from "@/app/common/api";
import EventPopup from "@/app/components/EventPopup";

const priorityColors = {
  Low: "#B0E57C", // Light green
  Medium: "#FFDE59", // Yellow
  High: "#FF8C42", // Orange
  Urgent: "#FF5C5C", // Red
};
const CalendarPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr); // Set the selected date
    setDialogOpen(true); // Open the dialog
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDate(null);
  };
  const handleEventClick = (info) => {
    const eventId = info.event.id; 
    const fullEventData = events.find((event) => event.id === eventId);
    setSelectedEvent(fullEventData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedEvent(null);
  };

  const truncateTitle = (title, maxLength = 15) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  useEffect(() => {
    const fetchALLEvents = async () => {
      try {
        const allTasksResponse = await API.getAllTask();
        console.log("All tasks", allTasksResponse?.data.data);
        const tasks = allTasksResponse?.data.data;
        console.log("taks------------", tasks);
        const formattedEvents = tasks.map((task) => ({
          id: task._id,
          title: truncateTitle(task.title),
          date: task.createdAtDate,
          backgroundColor: priorityColors[task.priority] || "#B0E57C",
          textColor: "#000000",
          createdBy: task.createdBy,
          creatorName: task.creatorName,
          creatorEmail: task.creatorEmail,
          status: task.status,
          priority: task.priority,
          description: task.description || "No Description",
        }));
        console.log("Formatted events", formattedEvents)
        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchALLEvents();
  }, []);
  

  return (
    <RequireAuth>
      <div className="flex flex-col justify-center">
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <Header className=" bg-white shadow-md" />
          {/* Calendar Component */}
          <div className="p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>
        </div>
        <TaskDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          selectedDate={selectedDate} // Pass the selected date to the dialog
        />
        {/* Render EventPopup if an event is selected */}
        {popupOpen && (
          <EventPopup event={selectedEvent} onClose={handleClosePopup} />
        )}
      </div>
    </RequireAuth>
  );
};

export default CalendarPage;
