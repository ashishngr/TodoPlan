import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"; 
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const page = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Card className="mx-auto max-w-sm">
  <CardHeader>
    <CardTitle className="text-xl">Sign In</CardTitle>
    <CardDescription>
      Enter your email and password to Sign In
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-4">
      {/* Flex row for first and last name */}
     

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
     
     {/* Contact Number */}
    
      {/* DOB */}
     

      {/* Create Account Button */}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </div>

    {/* Text Link for already having an account */}
    <div className="mt-4 text-center text-sm">
      Do not have an account?{" "}
      <Link href="/signup" className="underline">
        Sign Up
      </Link>
    </div>
  </CardContent>
</Card>
    </div>
  )
}

export default page