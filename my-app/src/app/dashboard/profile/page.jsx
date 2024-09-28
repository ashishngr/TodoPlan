"use client";

import React, { useState } from "react";
import RequireAuth from "@/app/common/RequireAuth";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Header from "@/app/components/Header";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

export default function Profile() {
  const [invitees, setInvitees] = useState([
    {
      name: "Mikku Nagar",
      email: "mikku1@gmail.com",
    },
    {
      name: "Simran Nagar",
      email: "simran2@gmail.com",
    },
    {
      name: "Mikku Nagar",
      email: "mikku3@gmail.com",
    },
    {
      name: "Simran Nagar",
      email: "simran4@gmail.com",
    },
    {
      name: "Mikku Nagar",
      email: "mikku5@gmail.com",
    },
    {
      name: "Simran Nagar",
      email: "simran6@gmail.com",
    },
  ]);

  const handleRemove = (email) => {
    setInvitees(invitees.filter((invitee) => invitee.email !== email));
  };

  return (
    <RequireAuth>
      <div className="">
        <Header />

        <div className="p-4">
          <div className="flex flex-row justify-center">
            <div className="m-4 border-2 border-black p-6 rounded-lg">
              <div className="text-lg mb-3">
                User's Information{" "}
                <span>
                  {" "}
                  <ArrowRightAltOutlinedIcon />{" "}
                </span>
              </div>
              <form className="flex flex-row flex-wrap gap-3">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-[200px]"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="w-[200px]"
                />
                <Input type="email" placeholder="Email" className="w-[200px]" />
                <Input type="text" placeholder="Region" className="w-[200px]" />
                <Input
                  type="number"
                  placeholder="Contact Number"
                  className="w-[200px]"
                />
                <Input type="date" placeholder="DOB" className="w-[200px]" />
              </form>
              <div className="flex justify-center items-center ">
                <span className="text-lg text-white bg-black p-2 rounded-lg cursor-pointer mt-4 transition-transform duration-300 hover:scale-110">
                  UPDATE DETAILS
                </span>
              </div>
            </div>
            <div className="m-4 border-2 border-black p-6 rounded-lg">
              <div className="text-lg mb-3">
                Update Password
                <span>
                  {" "}
                  <ArrowRightAltOutlinedIcon />{" "}
                </span>
              </div>

              <form className="flex flex-row flex-wrap gap-3 ">
                <Input
                  type="password"
                  placeholder="Old Password"
                  className="max-w-[600px]"
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  className="max-w-[600px]"
                />
              </form>
              <div className="flex justify-center items-center ">
                <span className="text-lg text-white bg-black p-2 rounded-lg cursor-pointer mt-4 transition-transform duration-300 hover:scale-110">
                  UPDATE PASSWORD
                </span>
              </div>
            </div>
          </div>
          {/* Invitees */}
          <Separator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex justify-center p-4">
                <Button className="p-4 text-lg">ADD INVITEES</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Add Invitee</AlertDialogTitle>
                <AlertDialogDescription>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter Name" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="emai">Email</Label>
                        <Input id="email" placeholder="Enter Email" />
                      </div>
                    </div>
                  </form>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>CANCEL</AlertDialogCancel>
                <AlertDialogAction>ADD</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* Invitees  Section */}
        <div className="flex flex-wrap p-4 gap-2">
          {/* {invitees.map((invitee, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-200 p-2 rounded-full space-x-2"
        >

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-400 text-white font-bold">
            {invitee.name.charAt(0)}
          </div>

          <span className="text-gray-800">{invitee.name}</span>

          <button
            onClick={() => handleRemove(invitee.email)}
            className="ml-2 w-8 h-8 bg-black text-white rounded-full transition-transform duration-300 hover:scale-110 text-2xl"
          >
            &times;
          </button>
        </div>
      ))} */}

          {invitees.length > 0 ? (
            <div className="flex flex-wrap space-x-2">
              {invitees.map((invitee, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 p-2 rounded-full space-x-2"
                >
                  {/* Avatar with the first letter of the name */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-400 text-white font-bold">
                    {invitee.name.charAt(0)}
                  </div>
                  {/* Full name */}
                  <span className="text-gray-800">{invitee.name}</span>
                  {/* Circular Remove Button with Larger Cross */}
                  <button
                    onClick={() => handleRemove(invitee.email)}
                    className="ml-2 w-8 h-8 bg-black text-white rounded-full transition-transform duration-300 hover:scale-110 text-2xl"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500 text-2xl">
              <Alert className=" p-4 rounded-lg shadow-md">
                <RocketIcon className="h-8 w-8 text-blue-500" />
                <AlertDescription className="text-md text-gray-700 mt-2 ml-4">
                  You haven't added any invitees yet. Start inviting now!
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
