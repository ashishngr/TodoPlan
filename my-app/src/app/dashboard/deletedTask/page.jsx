'use client'
import React from 'react';
import RequireAuth from '@/app/common/RequireAuth';

export default function DeletedTask() {
  return (
    <RequireAuth>
    <div>
      <h1 className="text-2xl font-bold">Deleted Task</h1>
      <p>Deleted task content goes here.</p>
    </div>
    </RequireAuth>

  );
}