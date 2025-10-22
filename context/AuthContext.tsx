import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';
import * as db from '../services/db';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const loggedInUser = db.getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const loggedInUser = await db.loginUser(email, password);
    setUser(loggedInUser);
    setIsGuest(false);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    const newUser = await db.createUser(email, password);
    setUser(newUser);
    setIsGuest(false);
  };

  const logout = () => {
    db.logoutUser();
    setUser(null);
    setIsGuest(false);
  };

  const enterGuestMode = () => {
      setUser(null);
      setIsGuest(true);
  }

  const exitGuestMode = () => {
      setIsGuest(false);
  }

  const value = { user, isGuest, loading, login, signup, logout, enterGuestMode, exitGuestMode };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
