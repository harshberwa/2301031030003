// src/components/Navbar.jsx (updated)
import React, { useState } from "react";
import UserMenu from "../components/UserMenu";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../app/providers/AuthProvider"; // hypothetical auth context

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // user=null if not logged in

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
              EduStream
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
            >
              Courses
            </Link>

          {user ? (
  <UserMenu user={user} logout={logout} />
) : (
  <>
    <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium">
      Login
    </Link>
    <Link to="/signup" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium">
      Signup
    </Link>
  </>
)}


            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pt-2 pb-4 space-y-1">
          <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">
            Home
          </Link>
          <Link to="/catalog" className="block text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">
            Courses
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                {user.name || "Profile"}
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                Sign Up
              </Link>
            </>
          )}

          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
}
