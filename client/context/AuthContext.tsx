"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getApolloClient } from "@/apollo/apollo-client";
import getCurrentUser from "@/apollo/operations/getCurrentUser";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  user: { email: string; name: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ email: string; name: string } | null>
  >;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const apolloClient = getApolloClient();
      const promiseCurrentUser = getCurrentUser(apolloClient);
      const [currentuser] = await Promise.all([promiseCurrentUser]);

      const { data } = currentuser;

      if (data?.currentUser.email) {
        setUser(data.currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setUser(null);
      setIsAuthenticated(!result.ok);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, router]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      signOut,
      checkAuth,
      loading,
    }),
    [isAuthenticated, user, signOut, checkAuth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
