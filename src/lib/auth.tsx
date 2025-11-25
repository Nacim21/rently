import React, { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "Landlord" | "Tenant";

export type User = {
  id: number;
  name: string;
  role: UserRole;
  password: string; // Plain text only for prototype parity with backend
};

//NEW TYPE API ROL
type ApiRole = "TENANT" | "LANDLORD";

type ApiUser = {
  id: number;
  name: string;
  password: string;
  role: ApiRole;
};



export type AuthResult = {
  success: boolean;
  message?: string;
};

type RegisterFn = (
  name: string,
  password: string,
  role: UserRole
) => Promise<AuthResult>;

type LoginFn = (
  name: string,
  password: string,
  role: UserRole
) => Promise<AuthResult>;


type AuthContextValue = {
  currentUser: User | null;
  registerUser: RegisterFn;
  login: LoginFn;
  logout: () => void;
};

const STORAGE_KEYS = {
  currentUser: "rently_current_user",
};

const COOKIE_KEYS = {
  currentUser: "rently_current_user",
};

 const API_ENDPOINTS = {
  listUsers: "/api/users/",
  createUser: "/api/users/create/",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
// tiny util that gets stuff from local storage and parses it
function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(key);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Failed to parse ${key} from localStorage`, error);
    return null;
  }
}

// helper to sync current user into a cookie so other parts can read it
function setCurrentUserCookie(user: User | null) {
  // same deal if there is no document we just skip
  if (typeof document === "undefined") return;

  if (!user) {
    // clear cookie when user logs out or is missing
    document.cookie = `${COOKIE_KEYS.currentUser}=; Max-Age=0; path=/`;
    return;
  }

  // build a tiny payload with user info no password only basic stuff
  const payload = JSON.stringify({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  // cookie lives for seven days feels ok for a demo app
  const maxAgeSeconds = 7 * 24 * 60 * 60; // 7 days

  // stash user info in cookie so next page loads can read it
  document.cookie = `${COOKIE_KEYS.currentUser}=${encodeURIComponent(
    payload
  )}; Max-Age=${maxAgeSeconds}; path=/`;
}

function apiRoleFromUiRole(role: UserRole): ApiRole {
  return role === "Tenant" ? "TENANT" : "LANDLORD";
}

function uiRoleFromApiRole(role: ApiRole): UserRole {
  return role === "TENANT" ? "Tenant" : "Landlord";
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    readStorage<User>(STORAGE_KEYS.currentUser)
  );

  const persistCurrentUser = (user: User | null) => {
    setCurrentUser(user);

    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem(
          STORAGE_KEYS.currentUser,
          JSON.stringify(user)
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEYS.currentUser);
      }
    }

    setCurrentUserCookie(user);
  };

  const registerUser: RegisterFn = async (
    name: string,
    password: string,
    role: UserRole
  ): Promise<AuthResult> => {
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      return { success: false, message: "Please enter a name" };
    }

    if (!trimmedPassword) {
      return { success: false, message: "Please enter a password" };
    }

    try {
      const response = await fetch(API_ENDPOINTS.createUser, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          password: trimmedPassword,
          role: apiRoleFromUiRole(role),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        return {
          success: false,
          message:
            (errorBody as { detail?: string })?.detail ??
            "Unable to register user. Please try again.",
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Failed to register user", error);
      return {
        success: false,
        message: "Unable to reach the server. Please try again.",
      };
    }
  };

  const login: LoginFn = async (
    name: string,
    password: string,
    role: UserRole
  ): Promise<AuthResult> => {
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      return { success: false, message: "Please enter your username" };
    }

    if (!trimmedPassword) {
      return { success: false, message: "Please enter your password" };
    }

    try {
      const response = await fetch(API_ENDPOINTS.listUsers);

      if (!response.ok) {
        return {
          success: false,
          message: "Unable to fetch users. Please try again.",
        };
      }

      const body = (await response.json()) as unknown;

      if (!Array.isArray(body)) {
        return {
          success: false,
          message: "Unexpected response from server.",
        };
      }

      const users: User[] = body.map((user: ApiUser) => ({
        id: user.id,
        name: user.name,
        password: user.password,
        role: uiRoleFromApiRole(user.role),
      }));

      const match = users.find(
        (user) =>
          user.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
          user.password === trimmedPassword &&
          user.role === role
      );

      if (!match) {
        return {
          success: false,
          message: "Invalid credentials. Check your name, password, and role.",
        };
      }

      persistCurrentUser(match);
      return { success: true };
    } catch (error) {
      console.error("Failed to login", error);
      return {
        success: false,
        message: "Unable to reach the server. Please try again.",
      };
    }
  };

  const logout = () => {
    persistCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      registerUser,
      login,
      logout,
    }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};


   export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};