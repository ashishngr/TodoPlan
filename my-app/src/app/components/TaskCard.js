import React from "react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { BsThreeDots } from "react-icons/bs";
import Typography from '@mui/material/Typography';
import { CiCircleList } from "react-icons/ci";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
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
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';




const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:theme.palette.grey[800],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[600],
    }),
  },
}));

const TaskCard = () => {
  return (
    <div className="">
      <Card
        sx={{
          backgroundColor: "#f5f5f5",
          maxWidth: "350px",
          padding: "8px",
        }}
      >
        <div className="flex flex-row justify-between align-middle">
          <Stack direction="row" spacing={1}>
            <Chip
              label="Chip Filled"
              sx={{
                backgroundColor: "black",
                color: "white", // Text color to contrast with black background
              }}
              size="small"
            />
            <Chip
              label="Chip Outlined"
              sx={{
                backgroundColor: "black",
                color: "white", // Text color to contrast with black background
              }}
              size="small"
            />
          </Stack>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <BsThreeDots size={22} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50">
                <DropdownMenuLabel>Task Details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem>Add Comment</DropdownMenuItem>
                  <DropdownMenuItem>Assign to User</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Task</DropdownMenuItem>
                  <DropdownMenuItem>Share Task</DropdownMenuItem>
                  <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 hover:text-red-800">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Ttitle Section */}
        <div className="flex flex-col flex-wrap mt-1">
        <Typography variant="subtitle1" gutterBottom>
          Title of my first task
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </Typography>
        </div>
        {/* Sub Task Section */}
        <div className="m-2 bg-white shadow-sm rounded-md p-2">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 align-baseline">
              <div><CiCircleList /></div>
              <div className="text-sm">Sub Task</div>
            </div> 
            <div className="text-sm">
              16/20
            </div>
        </div>
        <div className="mt-2">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        </div>
        {/* Card Footer */}
        <div className="flex flex-row justify-between p-2 ">
          {/* comment and link */}
          <div className="flex flex-row bg-white shadow-sm rounded-md p-2 cursor-pointer">
              <MdOutlineInsertComment />
          </div>
          {/* Collabration avatars*/}
          <div className="flex bg-white p-1">
          <AvatarGroup max={2} >
            <Avatar  sx={{ width: 24, height: 24 }} variant="rounded">A</Avatar>
            <Avatar  sx={{ width: 24, height: 24 }} variant="rounded">B</Avatar>
          </AvatarGroup>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
