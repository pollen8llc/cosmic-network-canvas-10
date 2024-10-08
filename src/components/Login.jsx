import React, { useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Login to Your Account</h1>
      <Button
        onClick={() => signInWithGoogle()}
        className="bg-white text-black hover:bg-gray-200"
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;