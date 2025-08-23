"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [error, setError] = useState("");

   const [confirmPassword, setConfirmPassword] = useState("");

   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     if(password !== confirmPassword){
          setError("Your passwords do not match");
     }

     try {
          await fetch("/api/auth/register", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
          });
     } catch (error) {
          setError("Registration failed");
     }


      
   };

  return (
    <div>Register</div>
  )
}

export default Register