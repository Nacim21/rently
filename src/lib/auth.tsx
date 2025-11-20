import React, { createContext, useContext, useMemo, useState } from "react";

// simple union type for the kind of user we support in this demo
// later we could add more roles here, but for now just these 2
export type UserRole = "Landlord" | "Tenant";

// basic shape of a user in our fake auth system
// this is what we keep in state and in localStorage
export type User = {
  id: number;
  name: string;
  role: UserRole;
};

// this is what the auth context exposes to the rest of the app
// kind of like our "mini auth api" for the frontend
type AuthContextValue = {
  currentUser: User | null;
  users: User[];
  registerUser: (name: string, role: UserRole) => { success: boolean; message?: string };
  login: (name: string, role: UserRole) => { success: boolean; message?: string };
  logout: () => void;
};

// just keeping keys in one place so we dont mistype them
// also easier to change later if we rename localstorage keys
const STORAGE_KEYS = {
  users: "rently_users",
  currentUser: "rently_current_user",
};

// some seed users so the app is not totally empty on the first load
// this is only for dev/demo, in a real app users come from backend
const seedUsers: User[] = [
  { id: 1, name: "Cesar Tirado", role: "Landlord" },
  { id: 2, name: "Sergio Rocha", role: "Tenant" },
  { id: 3, name: "Dulce Santos", role: "Tenant" },
  { id: 4, name: "Emiliano de Sanchez", role: "Landlord" },
  { id: 5, name: "Ashraful Garcia", role: "Tenant" },
  { id: 6, name: "Dulce Santos", role: "Tenant" },
];

// we start the context as undefined so we can throw if someone uses it wrong
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// small helper to read and parse json from localStorage in a safe way
// we guard for server side (no window) and invalid json
function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(key);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    // if something goes wrong we just log it and ignore that value
    console.error(`Failed to parse ${key} from localStorage`, error);
    return null;
  }
}

// this wraps the app and provides auth state + actions with React context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // we lazy-init users from localStorage so we dont do this on every render
  // if storage is empty we fall back to the seedUsers array
  const [users, setUsers] = useState<User[]>(() => {
    const fromStorage = readStorage<User[]>(STORAGE_KEYS.users);
    return fromStorage?.length ? fromStorage : seedUsers;
  });

  // same idea here, but for the currently logged in user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const fromStorage = readStorage<User>(STORAGE_KEYS.currentUser);
    return fromStorage ?? null;
  });

  // helper that updates state and also writes users to localStorage
  // this keeps our source of truth in one place
  const persistUsers = (next: User[]) => {
    setUsers(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(next));
    }
  };

  // same pattern but for the currentUser
  // if user is null we remove the key (logout case)
  const persistCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(STORAGE_KEYS.currentUser);
      }
    }
  };

  // simple “fake signup” that just appends to the users list
  // and logs the user in right away
  const registerUser = (name: string, role: UserRole) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      // this message is meant to be shown on the UI
      return { success: false, message: "Please enter a name" };
    }

    // avoid duplicate user with same name + role, we compare case insensitive
    const exists = users.some(
      (user) => user.name.toLowerCase() === trimmedName.toLowerCase() && user.role === role
    );

    if (exists) {
      return { success: false, message: "That user already exists. Try logging in instead." };
    }

    // using Date.now() as a quick id generator, ok for this mock
    const newUser: User = {
      id: Date.now(),
      name: trimmedName,
      role,
    };

    const nextUsers = [...users, newUser];
    persistUsers(nextUsers);
    persistCurrentUser(newUser);
    return { success: true };
  };

  // fake login: we just look for a user with same name + role in our array
  const login = (name: string, role: UserRole) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, message: "Please enter your name" };
    }

    const match = users.find(
      (user) => user.name.toLowerCase() === trimmedName.toLowerCase() && user.role === role
    );

    if (!match) {
      // no match means user never registered with this role
      return { success: false, message: "No user found for that name and role" };
    }

    persistCurrentUser(match);
    return { success: true };
  };

  // simple logout, we just clear currentUser everywhere
  const logout = () => {
    persistCurrentUser(null);
  };

  // we memo the context value so consumers dont re-render on every keystroke
  // only when users or currentUser actually change
  const value = useMemo(
    () => ({ currentUser, users, registerUser, login, logout }),
    [currentUser, users]
  );

  // this is the actual provider that wraps the rest of the app
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// small custom hook so components can just call useAuth()
// also we enforce the rule that it must be used under AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // if you see this error, probably you forgot to wrap the app in <AuthProvider>
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
