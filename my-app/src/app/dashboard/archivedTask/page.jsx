'use client'

import React from 'react';
import RequireAuth from '@/app/common/RequireAuth';
export default function ArchivedTask() {
  return (
    <RequireAuth>
 <div>
      <h1 className="text-2xl font-bold">Archived Task</h1>
      <p>Archived task content goes here.</p>
    </div>
    </RequireAuth>
   
  );
}