import { createContext } from "react";

export interface AuthContextType {
  user: { username: string };
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
