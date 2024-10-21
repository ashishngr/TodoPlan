import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { IoIosAddCircleOutline, IoMdTrash } from "react-icons/io";
import API from "../common/api";

const SubTask = ({ taskId }) => {
  const [subTasks, setSubTasks] = useState([]);
  const [newSubtask, setNewSubTask] = useState([])
  const inputRefs = useRef([]);

  // Fetch subtasks on component mount or taskId change
  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const data = await API.getSubTasks(taskId);
        setSubTasks(data?.data?.task?.subTasks || [{ title: "", status: "backlog" }]);
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    };
    fetchSubtasks();
  }, [taskId]);

  // Focus on the last input whenever subTasks are added or updated
  useEffect(() => {
    const lastIndex = subTasks.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  }, [subTasks]);

  // Add a new subtask
  const handleAddSubTask = () => {
    setSubTasks((prev) => [...prev, { title: "", status: "backlog" }]); 
    setNewSubTask((prev) => [...prev, { title: "", status: "backlog" }])
  };

  // Update the title of a subtask
  const handleInputChange = (index, value) => {
    setSubTasks((prev) => prev.map((task, i) => i === index ? { ...task, title: value } : task));
  };

  // Toggle subtask status
  const handleStatusChange = async (index) => {
    const updatedSubTasks = [...subTasks];
    const newStatus = updatedSubTasks[index].status === "complete" ? "backlog" : "complete";
    updatedSubTasks[index].status = newStatus;

    setSubTasks(updatedSubTasks);

    try {
      const subTaskId = updatedSubTasks[index]._id;
      await API.updateSubTaskStatus(taskId, subTaskId, { status: newStatus });
    } catch (error) {
      console.error("Error updating subtask status:", error);
    }
  };

  // Delete a subtask
  const handleDeleteSubTask = async (index, subTaskId) => {
    try {
      await API.deleteSubtask(taskId, subTaskId);
      setSubTasks((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  // Add a new subtask when Enter is pressed
  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" && subTasks[index].title.trim()) {
      e.preventDefault();
      handleAddSubTask();
    }
  };

  // Save subtasks
  const handleSaveSubtasks = async () => {
    try {
      await API.addSubTask(taskId, subTasks);
    } catch (error) {
      console.error("Error saving subtasks:", error);
    }
  };

  console.log("Sub tasks length ((((((((((())))))))))))", subTasks.length)
  console.log("NEW Sub tasks length ((((((((((())))))))))))", newSubtask.length)

  return (
    <div className="">
      <div className="min-h-[250px] shadow-2xl rounded-lg p-3 bg-white mt-4">
        <div className="flex bg-gray-200 p-2 justify-center rounded-lg shadow-sm mb-3">
          <Typography variant="h6">SUBTASK</Typography>
        </div>
        {subTasks.map((subTask, index) => (
          <div key={index} className="flex flex-row gap-2 items-center mb-2">
            <input
              type="checkbox"
              checked={subTask.status === "complete"}
              onChange={() => handleStatusChange(index)}
            />
            <input
              className="w-full text-lg font-bold border-b-2 focus:outline-none bg-gray-100"
              value={subTask.title}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, index)}
            />
            {index === subTasks.length - 1 && (
              <span
                className={`p-2 cursor-pointer bg-gray-200 rounded-full ${!subTask.title.trim() ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={handleAddSubTask}
              >
                <IoIosAddCircleOutline size={22} />
              </span>
            )}
            {subTask.title.trim() && (
              <span
                className="p-2 cursor-pointer bg-gray-200 rounded-full"
                onClick={() => handleDeleteSubTask(index, subTask._id)}
              >
                <IoMdTrash size={20} />
              </span>
            )}
          </div>
        ))}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSaveSubtasks}
          disabled={newSubtask.length === 0}
        >
          Save SubTask
        </button>
      </div>
    </div>
  );
};

export default SubTask;

