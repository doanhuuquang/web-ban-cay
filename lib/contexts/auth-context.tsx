"use client";

import { IS_LOGGED } from "@/lib/constants/local-storage-keys";
import { User } from "@/lib/models/user";
import { introspectToken } from "@/lib/services/auth-service";
import React from "react";

type AuthContextProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

export function useUser() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used within a <UserProvider />");
  }

  return context;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [nextTokenRefreshTime, setNextTokenRefreshTime] =
    React.useState<Date | null>(null);

  // Cập nhật thời gian làm mới token
  React.useEffect(() => {
    if (!isLoggedIn) return;

    const getTokenRefreshTime = async () => {
      const time = await introspectToken();
      setNextTokenRefreshTime(time);
    };

    getTokenRefreshTime();
  }, [isLoggedIn]);

  // Kiểm tra trạng thái đăng nhập
  React.useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem(IS_LOGGED) === "true");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
