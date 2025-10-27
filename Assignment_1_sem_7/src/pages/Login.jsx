// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import {DarkModeToggle} from "../app/components/DarkModeToggle"
import { useTheme } from "../app/providers/ThemeProvider";
import { useAuth } from "../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


const handleLogin = (e) => {
  e.preventDefault();
  const result = login({ email, password });
  if (!result.success) {
    alert(result.message);
  } else {
    navigate("/"); // redirect to home
  }
};

  return (
    <div className={`min-h-screen bg-background dark:bg-darkBackground text-gray-900 dark:text-white`}>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center py-20 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to EduStream</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/80 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
          <div className="mt-4 flex justify-center">
            {/* <DarkModeToggle /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
