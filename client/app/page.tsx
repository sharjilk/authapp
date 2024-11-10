"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center">
        <span className="text-4xl mb-4 block">Homepage</span>
        <br />
        {isAuthenticated ? `Hello, ${user?.name}` : "You are logged out"}
      </h1>
    </div>
  );
}
