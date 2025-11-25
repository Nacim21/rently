import React, { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "Landlord" | "Tenant";

export type User = {
  id: number;
  name: string;
  role: UserRole;
  password: string; // Just for the prototype, DO NOT RAGE xd
};

export type AuthResult = {
  success: boolean;
  message?: string;
};

type RegisterFn = {
  (name: string, password: string, role: UserRole): AuthResult;
  // kept for backwards compatibility with older screens that only pass name + role
  (name: string, role: UserRole): AuthResult;
};

type LoginFn = {
  (name: string, password: string, role: UserRole): AuthResult;
  // legacy signature: name + role (no password check)
  (name: string, role: UserRole): AuthResult;
};

type AuthContextValue = {
  currentUser: User | null;
  users: User[];
  // keep API surface small but typed, we now use the overloaded fn types above
  registerUser: RegisterFn;
  login: LoginFn;
  logout: () => void;
};

const STORAGE_KEYS = {
  users: "rently_users",
  currentUser: "rently_current_user",
};

const COOKIE_KEYS = {
  // cookie key where we stash a tiny current user snapshot
  currentUser: "rently_current_user",
};

// simple seed users for demos
const seedUsers: User[] = [
  { id: 1, name: "Cesar Tirado", role: "Landlord", password: "123456" },
  { id: 2, name: "Juan", role: "Tenant", password: "123456" },
  { id: 3, name: "Dulce Santos", role: "Tenant", password: "123456" },
  { id: 4, name: "Emiliano Garcia", role: "Landlord", password: "123456" },
  { id: 5, name: "Christian Serbin", role: "Tenant", password: "123456" },
  { id: 6, name: "Ashrafull Elias", role: "Tenant", password: "123456" },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// tiny util that gets stuff from local storage and parses it
function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null; // if we run on server there is no window so we just bail out
  const stored = window.localStorage.getItem(key); // grab raw string from browser storage with this key

  if (!stored) return null;
  // if nothing saved for this key just give back null

  try {
    // try to turn json string into real type
    return JSON.parse(stored) as T;
  } catch (error) {
    // if parse explodes we log and act like there was nothing saved
    console.error(`Failed to parse ${key} from localStorage`, error);
     //Emiliano no vuelvas a 
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(() => {
    const fromStorage = readStorage<User[]>(STORAGE_KEYS.users);

    if (fromStorage && fromStorage.length) {
      // migrate older user objects that might not have passwords
      return fromStorage.map((u, index) => ({
        ...u,
        password:
          (u as any).password && typeof (u as any).password === "string"
            ? (u as any).password
            : "123456", // default fallback just so old data still works
        id: u.id ?? index + 1,
      }));
    }

    return seedUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const fromStorage = readStorage<User>(STORAGE_KEYS.currentUser);
    return fromStorage ?? null;
  });

  const persistUsers = (next: User[]) => {
    setUsers(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(next));
    }
  };

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

    //  cookie for simple client-side persistence
    setCurrentUserCookie(user);
  };

  const registerUser: RegisterFn = (
    name: string,
    passwordOrRole: string | UserRole,
    maybeRole?: UserRole
  ): AuthResult => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, message: "Please enter a name" };
    }

    let password: string;
    let role: UserRole;

    // new signature: registerUser(name, password, role)
    if (typeof passwordOrRole === "string" && maybeRole) {
      password = passwordOrRole.trim();
      role = maybeRole;
    } else {
      // legacy signature: registerUser(name, role)
      password = "123456"; // default password for old flows
      role = passwordOrRole as UserRole;
    }

    if (!password) {
      return { success: false, message: "Please enter a password" };
    }

    const exists = users.some(
      (user) =>
        user.name.toLowerCase() === trimmedName.toLowerCase() &&
        user.role === role
    );

    if (exists) {
      return {
        success: false,
        message: "That user already exists. Try logging in instead.",
      };
    }

    const newUser: User = {
      id: Date.now(),
      name: trimmedName,
      role,
      password,
    };

    const nextUsers = [...users, newUser];
    persistUsers(nextUsers);
    persistCurrentUser(newUser);
    return { success: true };
  };

  const login: LoginFn = (
    name: string,
    passwordOrRole: string | UserRole,
    maybeRole?: UserRole
  ): AuthResult => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, message: "Please enter your username" };
    }

    // legacy signature: login(name, role) — no password check, used only by old UI
    if (typeof passwordOrRole !== "string" || !maybeRole) {
      const role = passwordOrRole as UserRole;

      const match = users.find(
        (user) =>
          user.name.toLowerCase() === trimmedName.toLowerCase() &&
          user.role === role
      );

      if (!match) {
        return {
          success: false,
          message: "No user found for that name and role",
        };
      }

      persistCurrentUser(match);
      return { success: true };
    }

    // new signature: login(name, password, role)
    const password = passwordOrRole.trim();
    const role = maybeRole as UserRole; // here we know we are in the "new" branch so role is defined

    if (!password) {
      return { success: false, message: "Please enter your password" };
    }

    const byName = users.filter(
      (user) => user.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (!byName.length) {
      return { success: false, message: "No user found with that name" };
    }

    const byNameAndRole = byName.filter((user) => user.role === role);

    if (!byNameAndRole.length) {
      return {
        success: false,
        message: `We found "${name}", but not as a ${role}. Check your role and try again.`,
      };
    }

    const userForRole = byNameAndRole[0];

    if (userForRole.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    persistCurrentUser(userForRole);
    return { success: true };
  };

  const logout = () => {
    persistCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      registerUser,
      login,
      logout,
    }),
    [currentUser, users]
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
