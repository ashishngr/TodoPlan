'use client'
import React, { useState } from 'react'; 
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"; 
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import API from '../common/api';
import { useRouter } from 'next/navigation';

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

    console.log("we are here inside function --"); // Debugging log
    setIsLoading(true);
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
