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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Layout({ children }) { 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 
  const pathname = usePathname();

  console.log("Router", pathname);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <TooltipProvider>
        <nav className=" bg-white text-gray-800 p-4 shadow-lg border-r-2 border-gray-300">
          <ul className="space-y-6">
            <li className="mb-4">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/task">
                    <div className="flex items-center space-x-4 hover:scale-110 transition-transform duration-300">
                      <MdOutlineTask
                        size={`${pathname === "/dashboard/task" ? 30 : 20}`}
                      />{" "}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Task</TooltipContent>
              </Tooltip>
            </li>

            <li className="mb-4">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/completeTask">
                    <div className="flex items-center space-x-4 hover:scale-110 transition-transform duration-300">
                      <MdDone
                        size={`${
                          pathname === "/dashboard/completeTask" ? 35 : 20
                        }`}
                      />{" "}
                    </div>
                  </Link>
                  <TooltipContent>Complete Tasks</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li className="mb-4">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/deletedTask">
                    <div className="flex items-center space-x-4 hover:scale-110 transition-transform duration-300">
                      <MdDeleteOutline
                        size={`${
                          pathname === "/dashboard/deletedTask" ? 35 : 20
                        }`}
                      />{" "}
                    </div>
                  </Link>
                  <TooltipContent>Deleted Tasks</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li className="mb-4">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/archivedTask">
                    <div className="flex items-center space-x-4 hover:scale-110 transition-transform duration-300">
                      <RiArchiveDrawerLine
                        size={`${
                          pathname === "/dashboard/archivedTask" ? 35 : 20
                        }`}
                      />{" "}
                    </div>
                  </Link>
                  <TooltipContent>Archived Tasks</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li className={`mb-4 `}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/analytics">
                    <div
                      className={`flex items-center  hover:scale-110 transition-transform duration-300 rounded-lg`}
                    >
                      <IoAnalytics
                        size={`${
                          pathname === "/dashboard/analytics" ? 35 : 20
                        }`}
                      />{" "}
                    </div>
                  </Link>
                  <TooltipContent>Analytics</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li className="mb-4">
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/profile">
                    <div className="flex items-center space-x-4 hover:scale-110 transition-transform duration-300">
                      <AiOutlineProfile
                        size={`${pathname === "/dashboard/profile" ? 35 : 20}`}
                      />{" "}
                    </div>
                  </Link>
                  <TooltipContent>Profile</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
          </ul>
          <div className="w-full mt-24 cursor">
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  <RiLogoutBoxRFill size={30} />
                </button>
                <TooltipContent>Log Out</TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </nav>
      </TooltipProvider>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
    </div>
  );
}
