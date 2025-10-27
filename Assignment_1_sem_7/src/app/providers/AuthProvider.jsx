// src/app/providers/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("eduUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("eduUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("eduUser");
    }
  }, [user]);

  // Login function
  const login = ({ email, password }) => {
    const registeredUsers = JSON.parse(localStorage.getItem("eduUsers")) || [];
    const existingUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser({ name: existingUser.name, email: existingUser.email });
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  // Register function
  const register = ({ name, email, password }) => {
    let registeredUsers = JSON.parse(localStorage.getItem("eduUsers")) || [];

    const userExists = registeredUsers.some((u) => u.email === email);
    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem("eduUsers", JSON.stringify(registeredUsers));
    setUser({ name, email });
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
