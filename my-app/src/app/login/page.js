'use client'
import React, {useState, useEffect} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { useRouter } from "next/navigation";

import API from "../common/api"; 
import PasswordInput from "../components/PasswordInput";
const StorageUtils = require("../common/storageUtils"); 


const page = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()


    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = {
                email: email,
                password: password,
            };
            const response = await API.login(formData); 
            let token = response?.data.token; 
            console.log("token", token); 
            if (response.status === 200) {
                // Assuming response contains token, save it
                StorageUtils.setAPIToken(token);
                toast({
                  title: "Login successful!",
                  description: "Redirecting to dashboard...",
                });
                router.push("/dashboard/home"); // Redirect to dashboard
              } else {
                throw new Error("Invalid login credentials");
              }
        } catch (error) {
            console.log("error", error); 
            toast({
                title: "Login failed",
                description: error || "Something went wrong",
                variant: "destructive", // Customize this based on your toast styling
              });
        }
        finally {
            setIsLoading(false);
          }
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to Sign In
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
            {/* Flex row for first and last name */}

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              {/* <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
               <PasswordInput 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
          

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
  );
};

export default page;
