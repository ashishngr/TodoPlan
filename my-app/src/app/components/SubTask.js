// import React, { useState, useRef, useEffect } from "react";
// import Typography from "@mui/material/Typography";
// import { IoIosAddCircleOutline, IoMdTrash } from "react-icons/io";
// import API from "../common/api";

// const SubTask = ({ taskId }) => {
//   const [subTasks, setSubTasks] = useState([]);
//   const [newSubTasks, setNewSubTasks] = useState([]);

//   const inputRefs = useRef([]);

//   // Fetch subtasks on component mount or taskId change
//   useEffect(() => {
//     const fetchSubtasks = async () => {
//       try {
//         const data = await API.getSubTasks(taskId);
//         const fetchedSubTasks = data?.data?.task?.subTasks;
//         // setSubTasks(
//         //   fetchedSubTasks?.length ? fetchedSubTasks : [{ title: "", status: "backlog" }]
//         // );
//         if (Array.isArray(fetchedSubTasks) && fetchedSubTasks.length > 0) {
//           setSubTasks(fetchedSubTasks);
//         } else {
//           // Otherwise, initialize with a default empty subtask
//           setSubTasks([{ title: "", status: "backlog" }]);
//         }
//       } catch (error) {
//         console.error("Error fetching subtasks:", error);
//       }
//     };
//     fetchSubtasks();
//   }, [taskId]);

//   // Focus on the last input whenever subTasks are added or updated
//   useEffect(() => {
//     const lastIndex = subTasks.length - 1;
//     if (inputRefs.current[lastIndex]) {
//       inputRefs.current[lastIndex].focus();
//     }
//   }, [subTasks]);

//   // Add a new subtask
//   const handleAddSubTask = () => {
//     const newSubTask = { title: "", status: "backlog" };
//     setSubTasks((prev) => [...prev, newSubTask]);
//     setNewSubTasks((prev) => [...prev, newSubTask]);
//   };

//   // Update the title of a subtask
//   const handleInputChange = (index, value) => {
//     // setSubTasks((prev) => prev.map((task, i) => i === index ? { ...task, title: value } : task));
//     // // If the index is for a new subtask, update newSubTasks as well
//     // if (index >= subTasks.length - newSubTasks.length) {
//     //   setNewSubTasks((prev) =>
//     //     prev.map((task, i) =>
//     //       i === index - (subTasks.length - newSubTasks.length)
//     //         ? { ...task, title: value }
//     //         : task
//     //     )
//     //   );
//     // }
//     setSubTasks((prev) =>
//       prev.map((task, i) => (i === index ? { ...task, title: value } : task))
//     );
  
//     // Update the title in newSubTasks if it's a newly added task
//     if (index >= subTasks.length - newSubTasks.length) { 
//       console.log("We are here")
//       setNewSubTasks((prev) => {
//         const newTaskIndex = index - (subTasks.length - newSubTasks.length);
//         return prev.map((task, i) =>
//           i === newTaskIndex ? { ...task, title: value } : task
//         );
//       });
//     }
//   };

//   // Toggle subtask status
//   const handleStatusChange = async (index) => {
//     const updatedSubTasks = [...subTasks];
//     const newStatus = updatedSubTasks[index].status === "complete" ? "backlog" : "complete";
//     updatedSubTasks[index].status = newStatus;
//     setSubTasks(updatedSubTasks);
//     try {
//       const subTaskId = updatedSubTasks[index]._id;
//       await API.updateSubTaskStatus(taskId, subTaskId, { status: newStatus });
//     } catch (error) {
//       console.error("Error updating subtask status:", error);
//     }
//   };

//   // Delete a subtask
//   const handleDeleteSubTask = async (index, subTaskId) => {
//     try {
//       await API.deleteSubtask(taskId, subTaskId);
//       setSubTasks((prev) => prev.filter((_, i) => i !== index));
//       // Remove from newSubTasks if it's a newly added task
//       if (index >= subTasks.length - newSubTasks.length) {
//         setNewSubTasks((prev) => prev.filter((_, i) => i !== (index - (subTasks.length - newSubTasks.length))));
//       }
//     } catch (error) {
//       console.error("Error deleting subtask:", error);
//     }
//   };

//   // Add a new subtask when Enter is pressed
//   const handleKeyPress = (e, index) => {
//     if (e.key === "Enter" && subTasks[index].title.trim()) {
//       e.preventDefault();
//       handleAddSubTask();
//     }
//   };

//   // Save subtasks
//   const handleSaveSubtasks = async () => {
//     try {
//       if (newSubTasks.length > 0) {
//         await API.addSubTask(taskId, newSubTasks);
//         setNewSubTasks([]);
//         // Refetch the subtasks to update the list with saved subtasks
//         const data = await API.getSubTasks(taskId);
//         setSubTasks(data?.data?.task?.subTasks || []);
//       }
//     } catch (error) {
//       console.error("Error saving subtasks:", error);
//     }
//   };

//   console.log("Sub tasks length ((((((((((())))))))))))", subTasks.length);
//   console.log(
//     "NEW Sub tasks length ((((((((((())))))))))))",
//     newSubTasks.length
//   );

//   return (
//     <div className="">
//       <div className="min-h-[250px] shadow-2xl rounded-lg p-3 bg-white mt-4">
//         <div className="flex bg-gray-200 p-2 justify-center rounded-lg shadow-sm mb-3">
//           <Typography variant="h6">SUBTASK</Typography>
//         </div>
//         {subTasks.map((subTask, index) => (
//           <div key={index} className="flex flex-row gap-2 items-center mb-2">
//             <input
//               type="checkbox"
//               checked={subTask.status === "complete"}
//               onChange={() => handleStatusChange(index)}
//             />
//             <input
//               className="w-full text-lg font-bold border-b-2 focus:outline-none bg-gray-100"
//               value={subTask.title}
//               ref={(el) => (inputRefs.current[index] = el)}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyPress(e, index)}
//             />
//             {index === subTasks.length - 1 && (
//               <span
//                 className={`p-2 cursor-pointer bg-gray-200 rounded-full ${
//                   !subTask.title.trim() ? "cursor-not-allowed opacity-50" : ""
//                 }`}
//                 onClick={handleAddSubTask}
//               >
//                 <IoIosAddCircleOutline size={22} />
//               </span>
//             )}
//             {subTask.title.trim() && (
//               <span
//                 className="p-2 cursor-pointer bg-gray-200 rounded-full"
//                 onClick={() => handleDeleteSubTask(index, subTask._id)}
//               >
//                 <IoMdTrash size={20} />
//               </span>
//             )}
//           </div>
//         ))}
//         <div className="flex justify-center">
//           <button
//             className={`mt-4 p-2 text-white rounded-md shadow-md ${
//               newSubTasks.length === 0 ? 'bg-gray-300' : 'bg-black'
//             }`}
//             onClick={handleSaveSubtasks}
//             disabled={newSubTasks.length === 0}
//           >
//             Save SubTask
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubTask;

import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { IoIosAddCircleOutline, IoMdTrash } from "react-icons/io";
import API from "../common/api";

const SubTask = ({ taskId }) => {
  const [subTasks, setSubTasks] = useState([]);
  const inputRefs = useRef([]);

  // Fetch subtasks on component mount or taskId change
  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const data = await API.getSubTasks(taskId);
        const fetchedSubTasks = data?.data?.task?.subTasks;
        setSubTasks(
          Array.isArray(fetchedSubTasks) && fetchedSubTasks.length > 0
            ? fetchedSubTasks
            : [{ title: "", status: "backlog" }]
        );
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
  };

  // Update the title of a subtask
  const handleInputChange = (index, value) => {
    setSubTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, title: value } : task))
    );
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
      const unsavedSubTasks = subTasks.filter((task) => !task._id && task.title.trim());
      if (unsavedSubTasks.length > 0) {
        await API.addSubTask(taskId, unsavedSubTasks);
        // Refetch the subtasks to update the list with saved subtasks
        const data = await API.getSubTasks(taskId);
        setSubTasks(data?.data?.task?.subTasks || []);
      }
    } catch (error) {
      console.error("Error saving subtasks:", error);
    }
  };

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
              className="hidden"
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
                className={`p-2 cursor-pointer bg-gray-200 rounded-full ${
                  !subTask.title.trim() ? "cursor-not-allowed opacity-50" : ""
                }`}
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
        <div className="flex justify-center">
          <button
            className={`mt-4 p-2 text-white rounded-md shadow-md ${
              subTasks.some((task) => !task._id && task.title.trim()) ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={handleSaveSubtasks}
            disabled={!subTasks.some((task) => !task._id && task.title.trim())}
          >
            Save SubTask
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubTask;

