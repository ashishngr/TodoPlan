"use client";

import React, { useState, useEffect } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PasswordInput from "@/app/components/PasswordInput";
import { Snackbar } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdDeleteOutline } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { Info } from "lucide-react";

import API from "@/app/common/api";

export default function Profile() {
  const [invitees, setInvitees] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    region: "",
    dob: dayjs(),
  });
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [inviteeFirstName, setInviteeFirstName] = useState("");
  const [inviteeLastName, setInviteeLastName] = useState("");
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [inactiveInvitees, setInactiveInvitees] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [acceptedInvitations, setAcceptedInvitations] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.getUserProfile(); // Fetch the user's profile
        const fetchedData = response.data.basicDetails;
        // Convert dob to dayjs object
        setProfile({
          ...fetchedData,
          dob: dayjs(fetchedData.dob),
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    const loadAcceptedInvitations = async () => {
      const invitations = await API.getAcceptedInvitations();
      console.log("(------------------------------------)", invitations)
      setAcceptedInvitations(invitations?.data.invitations);
    };

    loadAcceptedInvitations();
  }, []);
  const fetchInvitees = async () => {
    try {
      const response = await API.getInvitees();
      setInvitees(response.data.invitees);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInactiveInvitees = async () => {
    try {
      const response = await API.getInactiveInvitees();
      console.log("Response in active", response.data.invitees);
      setInactiveInvitees(response.data.invitees); // Assuming API returns data in this format
    } catch (error) {
      console.error("Failed to fetch inactive invitees:", error);
    }
  };

  const fetchInvitations = async () => {
    try {
      const getInvitation = await API.getInvitations();
      const fetchedInvitations = getInvitation?.data?.invitations;
      console.log("Fetched Invitations: ", fetchedInvitations);
      setInvitations(fetchedInvitations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvitees();
    fetchInactiveInvitees();
    fetchInvitations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  const handleDobChange = (newDate) => {
    setProfile({
      ...profile,
      dob: newDate, // Set the new date as a dayjs object
    });
  };

  const removeInvitee = async (id) => {
    try {
      setSuccessMsg(null);
      const response = await API.deleteInvitee(id);
      console.log("response----------->", response);
      if (response.status === 200) {
        setSuccessMsg(response.data.message);
        await fetchInactiveInvitees();
      }
    } catch (error) {
      console.log(error);
      setSuccessMsg("Failed to remove invitee");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setSuccessMsg(null);
      const response = await API.updateUserProfile(profile);
      setSuccessMsg(response.data.message);
    } catch (error) {
      console.log(error);
      setSuccessMsg("Failed to update profile.");
    }
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handlePasswordUpdate = async () => {
    try {
      setSuccessMsg(null);
      const response = await API.updatePassword({
        currentPassword,
        newPassword,
      });
      setSuccessMsg(response.data.message);
    } catch (error) {
      console.error("Failed to update password:", error);
      setSuccessMsg("Failed to update password.");
    }
  };
  const handleSnackbarClose = () => {
    setSuccessMsg(null);
  };

  const handleAddInvitee = async () => {
    try {
      const inviteeData = {
        firstName: inviteeFirstName,
        lastName: inviteeLastName,
        email: inviteeEmail,
      };
      setSuccessMsg(null);
      const response = await API.addInvitee(inviteeData);
      console.log("response add invitee", response);
      if (response.status === 200) {
        setSuccessMsg(response.data.message);
        setInviteeFirstName("");
        setInviteeLastName("");
        setInviteeEmail("");
        await fetchInactiveInvitees();
      }
    } catch (error) {
      console.error("Failed to add invitee:", error);
      setSuccessMsg("Error : Failed to add invitee");
    }
  };
  const handleRemove = async (email, id) => {
    console.log("*******", typeof id);
    try {
      setSuccessMsg(null);
      const response = await API.deleteInvitee(id);
      if (response.status === 200) {
        setInvitees(invitees.filter((invitee) => invitee.email !== email));
        fetchInvitees();
        setSuccessMsg(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting invitee:", error);
      setSuccessMsg("Error : error in removing invitee");
      // Handle error appropriately (e.g., show toast message)
    }
  };
  const handleAcceptInvitiation = async (invitationId) => {
    const response = await API.acceptInvitation(invitationId);
    console.log("response", response);
  };

  const statusColor = (status) => {
    return status === "Draft"
      ? "text-gray-600"
      : status === "Pending"
      ? "text-yellow-600"
      : status === "Accepted"
      ? "text-green-600"
      : status === "Rejected"
      ? "text-red-600"
      : status === "Deleted"
      ? "text-red-500"
      : status === "Resent"
      ? "text-blue-600"
      : status === "Expired"
      ? "text-orange-600"
      : "text-black"; // default color if none matches
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <RequireAuth>
      <div className="">
        {/* =========================================================================================== */}
        <Header />
        {/* =========================================================================================== */}
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
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="w-[200px]"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-[200px]"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Region"
                  className="w-[200px]"
                  name="region"
                  value={profile.region}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  placeholder="Contact Number"
                  className="w-[200px]"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{
                        width: "200px",
                        "& .MuiInputBase-input": {
                          height: "7px", // Adjust height
                          fontSize: "14px", // Adjust font size
                        },
                      }}
                      value={profile.dob}
                      onChange={handleDobChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </form>
              <div
                className="flex justify-center items-center "
                onClick={handleProfileUpdate}
              >
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

              <form className="flex flex-row flex-wrap justify-center gap-3 ">
                <PasswordInput
                  type="password"
                  placeholder="Old Password"
                  className="max-w-[600px]"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
                <PasswordInput
                  type="password"
                  placeholder="New Password"
                  className="max-w-[600px]"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </form>
              <div
                className="flex justify-center items-center "
                onClick={handlePasswordUpdate}
              >
                <span className="text-lg text-white bg-black p-2 rounded-lg cursor-pointer mt-4 transition-transform duration-300 hover:scale-110">
                  UPDATE PASSWORD
                </span>
              </div>
            </div>
          </div>
          {/* Invitees */}
          <Separator />
          {/* =========================================================================================== */}
          <div className="p-4">
            {invitations.length > 0 ? (
              <div className="bg-blue-50 border-blue-500 text-gray-800 p-4">
                <div className="text-xl font-bold">Invitations</div>
                <div className="mt-2">
                  {invitations.map((invitation) => (
                    <div
                      key={invitation._id}
                      className="flex justify-between items-center p-2 border-b border-gray-300"
                    >
                      <div>
                        <p className="font-semibold">{invitation.senderName}</p>
                        <p className="text-gray-600">{invitation.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleAcceptInvitiation(invitation._id)
                          }
                          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          // onClick={() => handleReject(invitation._id)}
                          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No invitations available.
              </div>
            )}
          </div>

          {/* =========================================================================================== */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex justify-end p-2">
                <Button className="p-2 text-sm">ADD INVITEES</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Add Invitee</AlertDialogTitle>
                <AlertDialogDescription>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="inviteeFirstname">First Name</Label>
                        <Input
                          id="inviteeFirstname"
                          name="inviteeFirstname"
                          placeholder="Enter First Name"
                          value={inviteeFirstName}
                          onChange={(e) => setInviteeFirstName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="inviteeLastname">Last Name</Label>
                        <Input
                          id="inviteeLastname"
                          name="inviteeLastname"
                          placeholder="Enter Last Name"
                          value={inviteeLastName}
                          onChange={(e) => setInviteeLastName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="inviteeEmai">Email</Label>
                        <Input
                          id="inviteeEmai"
                          name="inviteeEmai"
                          placeholder="Enter Email"
                          value={inviteeEmail}
                          onChange={(e) => setInviteeEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>CANCEL</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddInvitee}>
                  ADD
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* =========================================================================================== */}

        {/* =========================================================================================== */}

        {/* Invitees  Section */}

        <div className="flex flex-row justify-between p-4 gap-6">
          <Card className="w-1/3 p-2 ">
            <CardHeader>
              <CardTitle>Your Invitees</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[240px] overflow-y-auto">
              {invitees.length > 0 ? (
                <div className="flex flex-row flex-wrap space-x-2 gap-2">
                  {invitees.map((invitee, index) => (
                    <div
                      key={invitee._id}
                      className="flex items-center bg-gray-200 p-2 rounded-full space-x-2"
                    >
                      {/* Avatar with the first letter of the name */}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-400 text-white font-bold">
                        {invitee.firstName.charAt(0)}
                      </div>
                      {/* Full name */}
                      <span className="text-gray-800">
                        {invitee.firstName} {invitee.lastName}
                      </span>
                      {/* Circular Remove Button with Larger Cross */}
                      <button
                        onClick={() => handleRemove(invitee.email, invitee._id)}
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
            </CardContent>
          </Card>
          {/* =========================================================================================== */}
          {/* Invitation Sections */}
          <div className=" w-1/3 p-4">
            {acceptedInvitations?.length > 0 ? (
              <Alert className="bg-green-50 border-green-500 text-gray-800 p-4">
                <AlertTitle className="text-xl font-bold">
                  Accepted Invitations
                </AlertTitle>
                <AlertDescription>
                  <ul>
                    {acceptedInvitations.map((invitation) => (
                      <li key={invitation._id} className="mb-2 p-2 border-b">
                        <p>
                          <strong>Sender Name:</strong>{" "}
                          {invitation.invitedBy.firstName}{" "}
                          {invitation.invitedBy.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {invitation.invitedBy.email}
                        </p>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-yellow-50 border-yellow-500 text-gray-800 p-4">
                <AlertTitle className="text-xl font-bold">
                  No Accepted Invitations
                </AlertTitle>
                <AlertDescription>
                  You currently have no accepted invitations.
                </AlertDescription>
              </Alert>
            )}
          </div>
          {/* =========================================================================================== */}
          <div className="w-[50%]">
            <Card className="w-full p-2">
              <CardHeader>
                <CardTitle>Invitations in progress</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[240px] overflow-y-auto">
                {inactiveInvitees.length > 0 ? (
                  inactiveInvitees.map((invitee, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center bg-gray-50 p-2 rounded-lg mb-2"
                    >
                      {/* Avatar */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-400 text-white font-bold">
                        {invitee.firstName.charAt(0)}
                      </div>

                      {/* Invitee Name */}
                      <span className="text-gray-800 font-medium">
                        {invitee.firstName} {invitee.lastName}
                      </span>

                      {/* Status */}
                      <span
                        className={`text-sm font-semibold ${statusColor(
                          invitee.status
                        )}`}
                      >
                        {invitee.status}
                      </span>

                      {/* Delete Button */}
                      <button className="text-red-500 hover:text-red-700">
                        <MdDeleteOutline
                          size={22}
                          onClick={() => removeInvitee(invitee._id)}
                        />
                      </button>

                      {/* Send Again Button */}
                      <button className="text-blue-500 hover:text-blue-700">
                        <LuSendHorizonal size={22} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-lg">
                    No inactive invitees.
                  </div>
                )}
                <Separator />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* =========================================================================================== */}
        <Snackbar
          open={!!successMsg}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={successMsg}
        />
      </div>
    </RequireAuth>
  );
}
