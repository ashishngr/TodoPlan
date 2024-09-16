import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13's app directory routing

export default function RequireAuth({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage or wherever you store it
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the token
  }

  if (!token) {
    // Redirect to login if token is not found
    router.replace('/login');
    return null; // Prevent rendering the protected content while redirecting
  }

  return <>{children}</>;
}