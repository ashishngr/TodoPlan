"use client";

// src/app/task/page.js
import React from 'react';
import Image from 'next/image'
import Link from "next/link";

const page = () => {
  return (
    <div className='flex flex-col  bg-slate-40 h-screen'>
        <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style> 

        <div className='flex flex-row m-10 flex-wrap-reverse justify-center gap-8'> 
            {/* Text Div */}  
            <div className='flex flex-col  align-center justify-center'>
                <h1 className='font-mono text-2xl leading-relaxed'> <span className='font-semibold text-cyan-500'>Welcome</span> To the Best <br/>Task Management Tool</h1> 
                <h1 className='font-mono text-6xl leading-relaxed text-cyan-500 '>ToDo Planer</h1> 
                <h3 className='font-mono text-lg font-semibold leading-relaxed'>Stay on Top of Your Tasks with Ease and Efficiency</h3>
                {/* Button */}
                <Link href="/dashboard/task" className=''> 
                    <button className='bg-cyan-500 h-20 w-full font-mono text-2xl text-indigo-600 mt-10 border-2 border-indigo-600 rounded-full'>
                        Start Creating Tasks
                    </button>
                </Link>
            </div>
            {/* Image Dic */}
            <div className=''>
                <Image  
                  src="/images/todo.png"
                  width={500}
                  height={500}
                  alt="Picture of the Todo"
                />
            </div>
        </div> 
        <div className='bg-cyan-500 text-indigo-600 py-4 overflow-hidden h-20'>
            <div className='relative'>
            <div className='absolute whitespace-nowrap animate-marquee'>
                <span className='text-2xl font-bold'>
                Welcome to the Best Task Management Tool! Stay on Top of Your Tasks with Ease and Efficiency!
                </span>
            </div>
            </div>
        </div>

    </div>
  );
}
export default page