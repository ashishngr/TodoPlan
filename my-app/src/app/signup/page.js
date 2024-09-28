'use client'
import React, { useState } from 'react'; 
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"; 
import API from '../common/api';
import { useRouter } from 'next/navigation';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validateEmail } from '@/utility/validateEmail';
import { validatePassword } from '@/utility/validatePassword';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const page = () => {
  const [date, setDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [purpose, setPurpose] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate email and password
    if (!validateEmail(email)) {
        console.log("Wrong Email")
      setIsLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      console.log("weak Password")
      setIsLoading(false);
      return;
    }

    try {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        region,
        purposeOfUse: purpose,
        contactNumber: contact,
        dob: date
      };
      console.log("formData", formData)

      const response = await API.signup(formData);
      let token = response?.data.access_toke;
      console.log("Res", token); // Debugging log

      if (response.status === 200) {
        console.log("we are here"); // Debugging log
        localStorage.setItem('access_token', token);
        router.push("/dashboard/task");
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
    }
    finally {
        setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Ensure onSubmit is attached properly */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {/* Flex row for first and last name */}
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 flex-grow">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Max" required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Robinson" required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <HoverCard>
              <HoverCardTrigger asChild>
                  <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Tips for a Strong Password:</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-gray-700">Use at least 8 characters.</li>
                  <li className="text-gray-700">Include both uppercase and lowercase letters.</li>
                  <li className="text-gray-700">Add at least one number.</li>
                  <li className="text-gray-700">Incorporate special characters (e.g., @, #, $, %).</li>
                  <li className="text-gray-700">Avoid using easily guessable information (e.g., names, birthdays).</li>
                </ul>
              </div>
              </HoverCardContent>
              </HoverCard>
            

              {/* Purpose of use and Region */}
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 flex-grow">
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" placeholder="Region" required 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <Label htmlFor="purposeOfUse">Purpose</Label>
                  <Select onValueChange={(value) => setPurpose(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Purpose Of Use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Purpose Of Use</SelectLabel>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Educational">Educational</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" type="tel" required 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              {/* DOB */}
              <div className="flex flex-col gap-2">
              <Label htmlFor="dob">Date Of Birth</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']}>
                  <DatePicker sx={{ width: '100%' }} 
                  value={date} 
                  onChange={(newValue) => setDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              </div>

              {/* Create Account Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create an account"}
              </Button>
            </div>
          </form>

          {/* Text Link for already having an account */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
