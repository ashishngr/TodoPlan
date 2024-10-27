"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import { MdOutlineTask } from "react-icons/md";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Drawer, IconButton, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import AppIcon from "@mui/icons-material/Apps";
import Typography from '@mui/material/Typography';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'; 
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Layout({ children }) { 
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const sidebarItems = [
    { label: "Home", icon: <OtherHousesOutlinedIcon size={25} />, link: "/dashboard/home" },
    { label: "Task", icon: <TaskAltOutlinedIcon size={25} />, link: "/dashboard/task" },
    { label: "Calendar", icon: <CalendarMonthIcon size={25} />, link: "/dashboard/calendar" },
    { label: "Completed", icon: <BeenhereOutlinedIcon size={25} />, link: "/dashboard/completeTask" },
    { label: "Archived", icon: <ArchiveOutlinedIcon size={25} />, link: "/dashboard/archivedTask" },
    // { label: "Upgrade", icon: <UpgradeOutlinedIcon size={25} />, link: "/dashboard/upgradeUser" },
    { label: "Analytics", icon: <AnalyticsOutlinedIcon size={25} />, link: "/dashboard/analytics" },
    { label: "Profile", icon: <AccountBoxOutlinedIcon size={25} />, link: "/dashboard/profile" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 
  const pathname = usePathname();

  console.log("Router", pathname);

  return (
    <div className="flex h-screen">
      {/* Drawer Trigger */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: "50%",
          left: open ? 232 : 73, // Adjusted for consistent positioning
          transform: "translateY(-50%)",
          zIndex: 1300,
          bgcolor: "gray"
        }}
      >
        
        <MenuIcon size={10}/>
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        variant="permanent" // Keeping it always rendered
        sx={{
          width: open ? 240 : 80, // Fixed width for closed state
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 80, // Maintain width in both states
            transition: "width 0.3s ease", // Smooth transition when opening/closing
            overflowX: "hidden", // Hide overflow when closed
          },
        }}
      >
        <Box
          sx={{
            width: open ? 240 : 80,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              borderBottom: "1px solid #ddd",
              
            }}
          >
            <AppIcon sx={{ fontSize: 40, marginRight: open ? 1 : 0 }} /> {/* Icon always visible */}
            {open && (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Notionize
              </Typography>
            )}
          </Box>

          {/* Sidebar Content */}
          <List>
            {sidebarItems.map((item) => (
              <Link key={item.label} href={item.link} passHref>
                <ListItem
                  button
                  sx={{
                      // Some margin when drawer is open
                    // marginRight: open ? "10px" : "10px", // Consistent margin on both sides
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    justifyContent: open ? "flex-start" : "center", // Icons centered when closed
                    borderRadius: "8px", // Rounded corners
                    backgroundColor:
                      pathname === item.link ? "#f0f0f0" : "transparent", // Active tab background
                    "&:hover": {
                      backgroundColor: "#f0f0f0", // Hover effect
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? "40px" : "auto", // Adjust icon space
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.label} />}
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <main className="flex-1 bg-white overflow-auto">{children}</main>
    </div>
  );
}
