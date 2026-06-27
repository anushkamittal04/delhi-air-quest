import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  points: number;
  completedQuests: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addPoints: (pts: number) => void;
  toggleQuest: (questId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    setUser({ name: email.split("@")[0], email, points: 120, completedQuests: [] });
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ name, email, points: 0, completedQuests: [] });
  };

  const logout = () => setUser(null);

  const addPoints = (pts: number) => {
    setUser((prev) => prev ? { ...prev, points: prev.points + pts } : prev);
  };

  const toggleQuest = (questId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const has = prev.completedQuests.includes(questId);
      return {
        ...prev,
        completedQuests: has
          ? prev.completedQuests.filter((q) => q !== questId)
          : [...prev.completedQuests, questId],
        points: has ? prev.points - 10 : prev.points + 10,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addPoints, toggleQuest }}>
      {children}
    </AuthContext.Provider>
  );
};
