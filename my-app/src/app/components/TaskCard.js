import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { BsThreeDots } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import { CiCircleList } from "react-icons/ci";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdOutlineInsertComment } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { useRouter } from "next/navigation";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.grey[800],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[600],
    }),
  },
}));

const TaskCard = ({ task }) => {
  const totalSubtasks = task?.subtask?.length || 0; // Default to 0 if undefined
  const completedSubtasks =
    task?.subtask?.filter((s) => s.status === "complete").length || 0;
  // Calculate the progress percentage
  const progressPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const handleEditClick = () => {
    // Redirect user to the edit task page
    router.push(`/dashboard/task/${task._id}`);
  };

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#fff",
          width: "360px",
          minHeight: "320px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <div className="flex justify-between items-center">
          <Stack direction="row" spacing={1}>
            <Chip
              label="High Priority"
              size="small"
              sx={{ backgroundColor: "#f44336", color: "white" }}
            />
            <Chip
              label="Due Soon"
              size="small"
              sx={{ backgroundColor: "#ff9800", color: "white" }}
            />
          </Stack>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1">
                <BsThreeDots size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Task Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleEditClick}>
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                <DropdownMenuItem>Add Comment</DropdownMenuItem>
                <DropdownMenuItem>Duplicate Task</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-2">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description || "No description provided"}
          </Typography>
        </div>

        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CiCircleList size={18} />
              <Typography variant="body2">Subtasks</Typography>
            </div>
            <Typography variant="body2">{`${completedSubtasks}/${totalSubtasks}`}</Typography>
          </div>
          <BorderLinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ mt: 1 }}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <Button variant="outlined" size="small" className="flex items-center">
            <MdOutlineInsertComment size={20} className="mr-1" /> Comment
          </Button>
          <AvatarGroup max={3}>
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
            <Avatar sx={{ width: 32, height: 32 }}>C</Avatar>
          </AvatarGroup>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
