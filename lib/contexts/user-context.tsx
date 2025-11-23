"use client";

import { IS_LOGGED } from "@/lib/constants/local-storage-keys";
import { User } from "@/lib/models/user";
import React from "react";

type UserContextProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
};

const UserContext = React.createContext<UserContextProps | null>(null);

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a <UserProvider />");
  }

  return context;
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem(IS_LOGGED) === "true");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
