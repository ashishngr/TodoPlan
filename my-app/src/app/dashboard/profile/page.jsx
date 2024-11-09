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
// import { LuSendHorizontal } from "lucide-react";
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
      console.log("(------------------------------------)", invitations);
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
        {/* <div className="p-4">
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
        {/* <Separator /> */}
        {/* </div> */}
        <div className="p-6 bg-gray-50 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {/* User Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full overflow-hidden">
              <h2 className="text-md font-medium text-gray-600 mb-4 flex items-center">
                User's Information
                <ArrowRightAltOutlinedIcon className="ml-2 text-gray-400" />
              </h2>
              <form className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Region"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  name="region"
                  value={profile.region}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  placeholder="Contact Number"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "6px",
                        fontSize: "12px",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        border: "1px solid #D1D5DB",
                      },
                    }}
                    placeholder="Date of Birth"
                    value={profile.dob}
                    onChange={handleDobChange}
                  />
                </LocalizationProvider>
              </form>
              <button
                onClick={handleProfileUpdate}
                className="w-full mt-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200"
              >
                Update Details
              </button>
            </div>

            {/* Update Password Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full overflow-hidden">
              <h2 className="text-md font-medium text-gray-600 mb-4 flex items-center">
                Update Password
                <ArrowRightAltOutlinedIcon className="ml-2 text-gray-400" />
              </h2>
              <form className="flex flex-col gap-4">
                <PasswordInput
                  type="password"
                  placeholder="Old Password"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
                <PasswordInput
                  type="password"
                  placeholder="New Password"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </form>
              <button
                onClick={handlePasswordUpdate}
                className="w-full mt-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200"
              >
                Update Password
              </button>
            </div>

            {/* Google Auth Flow Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full overflow-hidden flex flex-col justify-center items-center max-w-md mx-auto">
              <div className="flex flex-col items-center">
                {/* Google SVG Logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  className="w-8 h-8 mb-3"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c2.43 0 4.38.84 5.68 1.54l4.15-4.15C31.02 4.68 27.78 3 24 3 14.61 3 7 10.61 7 20s7.61 17 17 17c7.9 0 14.39-5.34 16.34-12.5h-7.72v-5h13.19v.68C45.82 34.25 35.64 43 24 43 12.4 43 3 33.6 3 22S12.4 1 24 1z"
                  />
                  <path
                    fill="#34A853"
                    d="M43.34 22.5c.16-1.12.16-2.28 0-3.5H24v7h10.56c-.46 2.39-2.38 4.41-4.89 5.3l5.89 4.56C39.24 32.91 43 27.39 43.34 22.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 13.5c2.1 0 3.99.72 5.49 1.91l4.07-4.07C31.79 9.12 27.91 7.5 24 7.5c-7.04 0-13.09 4.38-15.23 10.66l5.81 4.55C15.95 17.18 19.62 13.5 24 13.5z"
                  />
                  <path
                    fill="#EA4335"
                    d="M8.77 17.66C7.67 20.12 7 22.9 7 25.84s.67 5.71 1.77 8.18l5.81-4.56C12.41 27.62 12 25.25 12 22.83c0-2.39.42-4.69 1.17-6.83l-5.81-4.34z"
                  />
                </svg>

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Google Authentication
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6 max-w-xs">
                  Link your account with Google for a seamless experience across
                  all devices.
                </p>
              </div>

              <button
                onClick={"handleGoogleAuth"}
                className="flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-200"
              >
                {/* Google SVG Icon in Button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c2.43 0 4.38.84 5.68 1.54l4.15-4.15C31.02 4.68 27.78 3 24 3 14.61 3 7 10.61 7 20s7.61 17 17 17c7.9 0 14.39-5.34 16.34-12.5h-7.72v-5h13.19v.68C45.82 34.25 35.64 43 24 43 12.4 43 3 33.6 3 22S12.4 1 24 1z"
                  />
                  <path
                    fill="#34A853"
                    d="M43.34 22.5c.16-1.12.16-2.28 0-3.5H24v7h10.56c-.46 2.39-2.38 4.41-4.89 5.3l5.89 4.56C39.24 32.91 43 27.39 43.34 22.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 13.5c2.1 0 3.99.72 5.49 1.91l4.07-4.07C31.79 9.12 27.91 7.5 24 7.5c-7.04 0-13.09 4.38-15.23 10.66l5.81 4.55C15.95 17.18 19.62 13.5 24 13.5z"
                  />
                  <path
                    fill="#EA4335"
                    d="M8.77 17.66C7.67 20.12 7 22.9 7 25.84s.67 5.71 1.77 8.18l5.81-4.56C12.41 27.62 12 25.25 12 22.83c0-2.39.42-4.69 1.17-6.83l-5.81-4.34z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
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
        {/* =========================================================================================== */}
        <div className="p-6">
          {invitations.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 max-w-lg mx-auto">
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                Invitations
              </div>
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div
                    key={invitation._id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {invitation.senderName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {invitation.email}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptInvitiation(invitation._id)}
                        className="px-4 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectInvitation(invitation._id)}
                        className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <p className="text-xl">No invitations available.</p>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around p-4 gap-4">
          {/* Invitees Card */}
          <Card className="w-1/3 p-4 bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Your Invitees
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[200px] overflow-y-auto">
              {invitees.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {invitees.map((invitee) => (
                    <div
                      key={invitee._id}
                      className="flex items-center bg-gray-100 p-2 rounded-full shadow-sm space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">
                        {invitee.firstName.charAt(0)}
                      </div>
                      <span className="text-gray-800 font-medium">
                        {invitee.firstName} {invitee.lastName}
                      </span>
                      <button
                        onClick={() => handleRemove(invitee.email, invitee._id)}
                        className="ml-2 w-7 h-7 bg-red-500 text-white rounded-full text-xl flex items-center justify-center hover:bg-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert className="flex items-center p-4 rounded-lg shadow bg-gray-50">
                  <RocketIcon className="h-6 w-6 text-blue-500 mr-2" />
                  <AlertDescription className="text-gray-600">
                    No invitees added yet. Start inviting!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Accepted Invitations Card */}
          <Card className="w-1/3 p-4 bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Accepted Invitations
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[200px] overflow-y-auto">
              {acceptedInvitations?.length > 0 ? (
                <ul className="space-y-3">
                  {acceptedInvitations.map((invitation) => (
                    <li key={invitation._id} className="border-b pb-2">
                      <p className="font-semibold text-gray-700">
                        {invitation.invitedBy.firstName}{" "}
                        {invitation.invitedBy.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {invitation.invitedBy.email}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Alert className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded-md">
                  <AlertTitle>No Accepted Invitations</AlertTitle>
                  <AlertDescription>
                    Currently, there are no accepted invitations.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Invitations in Progress Card */}
          <Card className="w-1/3 p-4 bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Invitations in Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[200px] overflow-y-auto">
              {inactiveInvitees.length > 0 ? (
                inactiveInvitees.map((invitee) => (
                  <div
                    key={invitee._id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">
                      {invitee.firstName.charAt(0)}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {invitee.firstName} {invitee.lastName}
                    </span>
                    <span
                      className={`text-sm font-semibold ${statusColor(
                        invitee.status
                      )}`}
                    >
                      {invitee.status}
                    </span>
                    <button className="text-red-500 hover:text-red-700">
                      <MdDeleteOutline
                        size={20}
                        onClick={() => removeInvitee(invitee._id)}
                      />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                      <LuSendHorizonal size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <p>No inactive invitees.</p>
                </div>
              )}
            </CardContent>
          </Card>
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
