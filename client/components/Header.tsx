"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">My App</Link>
        </h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link href="/auth/signin" className="mr-4 hover:underline">
                Sign In
              </Link>
              <Link href="/auth/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={signOut} className="hover:underline">
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
