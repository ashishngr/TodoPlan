'use client'

import React from 'react';
import RequireAuth from '@/app/common/RequireAuth';
export default function Analytics() {
  return (
    <RequireAuth>
<div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p>Analytics content goes here.</p>
    </div>
    </RequireAuth>
    
  );
}