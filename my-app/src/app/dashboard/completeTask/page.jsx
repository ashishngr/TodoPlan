'use client'

import React from 'react';
import RequireAuth from '@/app/common/RequireAuth';
export default function CompleteTask() {
  return (
    <RequireAuth>
<div>
      <h1 className="text-2xl font-bold">Complete Task</h1>
      <p>Complete task content goes here.</p>
    </div>
    </RequireAuth>
    
  );
}