'use client'

import React from 'react';
import RequireAuth from '@/app/common/RequireAuth';
export default function Profile() {
  return (
    <RequireAuth>
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Profile content goes here.</p>
    </div>
    </RequireAuth>
    
  );
}