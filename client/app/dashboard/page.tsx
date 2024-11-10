"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-4xl mb-4 block">Dashboard</span>
          <br />
          {isAuthenticated
            ? `Hello, ${user?.name}, Welcome to the Application dashboard`
            : "You are not signed in"}
        </h1>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
