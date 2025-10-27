// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center">
        <p className="text-sm font-bold">&copy; {new Date().getFullYear()} EduStream. All rights reserved.</p>  
      </div>
    </footer>
  );
}
