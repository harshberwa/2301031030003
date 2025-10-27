import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * UserMenu
 * - shows Profile button (dropdown trigger) and an inline Checkout link
 * - dropdown contains Logout only
 * - hover shows dropdown; leaving hides it after delay
 * - click toggles dropdown (useful for mobile)
 */
export default function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const hideTimeout = useRef(null);
  const containerRef = useRef(null);

  const HIDE_DELAY = 500; // ms, change to taste

  const show = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setOpen(true);
  };

  const hide = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setOpen(false), HIDE_DELAY);
  };

  const toggle = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setOpen((v) => !v);
  };

  // close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-3">
        {/* Profile trigger */}
        <button
          onClick={toggle}
          onMouseEnter={show}
          onMouseLeave={hide}
          aria-haspopup="true"
          aria-expanded={open}
          className="px-2 py-1 rounded text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
        >
          {user?.name || "Profile"}
        </button>

        {/* Checkout stays inline (not in dropdown) */}
        <Link
          to="/checkout"
          className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
        >
          Checkout
        </Link>
        <Link
          to="/my-courses"
          className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
        >
          My Courses
        </Link>
      </div>

      {/* Dropdown */}
      <div
        onMouseEnter={show}
        onMouseLeave={hide}
        className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform origin-top-right transition-all duration-150 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
