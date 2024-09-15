'use client'
import React, {useState} from 'react'; 
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"; 
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
   

export const description = "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"


const page = () => {
  const [date, setDate] = useState(Date)
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
    <div className="flex flex-col gap-4">
      {/* Flex row for first and last name */}
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2 flex-grow">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" placeholder="Max" required />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required />
        </div>
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      {/* Purpose of use and Region */}
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2 flex-grow">
          <Label htmlFor="region">Region</Label>
          <Input id="region" placeholder="Region" required />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
        <Label htmlFor="purposeOfUse">Purpose</Label>    
        <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Purpose Of Use" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Purpose Of Use</SelectLabel>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
      </div>
     {/* Contact Number */}
     <div className="flex flex-col gap-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input id="contact" type="contact" placeholder="" required />
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
      <Button type="submit" className="w-full">
        Create an account
      </Button>
    </div>

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
  )
}

export default page