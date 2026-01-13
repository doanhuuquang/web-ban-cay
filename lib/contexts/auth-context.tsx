"use client";

import React from "react";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import { User } from "@/lib/models/user";
import { introspectToken, refreshToken } from "@/lib/services/auth-service";
import { getCurrentUserProfile } from "@/lib/services/user-service";

type AuthContextProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  isAdmin: boolean | null;
  setIsLoggedIn: (loggedIn: boolean) => void;
  refreshUserProfile: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider />");
  }
  return context;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const [nextTokenRefreshTime, setNextTokenRefreshTime] =
    React.useState<Date | null>(null);

  /* ======================================================
     KHỞI TẠO AUTH: token → user → role
     ====================================================== */
  React.useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);

      try {
        const { code, exp } = await introspectToken();

        // ❌ Không đăng nhập
        if (code !== API_SUCCESS_CODE.INTROSPECT_TOKEN_SUCCESS || !exp) {
          setIsLoggedIn(false);
          setUser(null);
          setIsAdmin(false);
          setNextTokenRefreshTime(null);
          return;
        }

        // ✅ Đăng nhập hợp lệ
        setIsLoggedIn(true);
        setNextTokenRefreshTime(exp);

        const res = await getCurrentUserProfile();
        const profile = res.userProfile;

        setUser(profile);
        setIsAdmin(
          profile!.roles?.some((role) => role.roleName === "ADMIN") ?? false
        );
      } catch (error) {
        // ❌ Lỗi bất kỳ → coi như chưa đăng nhập
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
        setNextTokenRefreshTime(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ======================================================
     TỰ ĐỘNG REFRESH TOKEN
     ====================================================== */
  React.useEffect(() => {
    if (!isLoggedIn || !nextTokenRefreshTime) return;

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
      timeToExpiry > refreshThreshold ? timeToExpiry - refreshThreshold : 1000;

    const timeoutId = setTimeout(async () => {
      try {
        await refreshAndUpdate();
      } catch {
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
      }
    }, timeoutDuration);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, nextTokenRefreshTime]);

  /* ======================================================
     HÀM LÀM MỚI USER PROFILE (dùng khi cần)
     ====================================================== */
  const refreshUserProfile = async () => {
    const res = await getCurrentUserProfile();
    const profile = res.userProfile;

    setUser(profile);
    setIsAdmin(
      profile!.roles?.some((role) => role.roleName === "ADMIN") ?? false
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        isAdmin,
        setIsLoggedIn,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
