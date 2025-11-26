"use client";

import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import { User } from "@/lib/models/user";
import { introspectToken, refreshToken } from "@/lib/services/auth-service";
import { getCurrentUserProfile } from "@/lib/services/user-service";
import React from "react";

type AuthContextProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a <UserProvider />");
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

  /*
  
  Kiểm tra trạng thái đăng nhập

  */
  React.useEffect(() => {
    try {
      setIsLoading(true);

      const checkLoggedInStatus = async () => {
        const { code, exp } = await introspectToken();

        if (code === API_SUCCESS_CODE.INTROSPECT_TOKEN_SUCCESS && exp) {
          setNextTokenRefreshTime(exp);
        }

        setIsLoggedIn(code === API_SUCCESS_CODE.INTROSPECT_TOKEN_SUCCESS);
      };

      checkLoggedInStatus();
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*

  Tự động làm mới token khi sắp hết hạn
  
  */
  React.useEffect(() => {
    if (!isLoggedIn) return;
    if (!nextTokenRefreshTime) return;

    const refreshAndUpdate = async () => {
      await refreshToken();

      const { code, exp } = await introspectToken();
      if (code === API_SUCCESS_CODE.INTROSPECT_TOKEN_SUCCESS && exp) {
        setNextTokenRefreshTime(exp);
      }
    };

    const now = new Date();
    const timeToExpiry = nextTokenRefreshTime.getTime() - now.getTime();
    const refreshThreshold = 2 * 60 * 1000; // 2 phút

    const timeoutDuration =
      timeToExpiry > refreshThreshold ? timeToExpiry - refreshThreshold : 0;

    const timeoutId = setTimeout(() => {
      refreshAndUpdate();
    }, timeoutDuration);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, nextTokenRefreshTime]);

  /*
  
  Lấy thông tin người dùng khi đăng nhập
  
  */
  React.useEffect(() => {
    try {
      setIsLoading(true);

      const fetchUserProfile = async () => {
        const user = (await getCurrentUserProfile()).userProfile;
        setUser(user);
      };

      if (isLoggedIn && !user) {
        fetchUserProfile();
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, user]);

  /*

  Xóa các giá trị khi đăng xuất

  */
  React.useEffect(() => {
    if (!isLoggedIn) {
      setUser(null);
      setNextTokenRefreshTime(null);
    }
  }, [isLoggedIn]);

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
