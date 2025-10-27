# setup-edustream.ps1
# Run in PowerShell with: Set-ExecutionPolicy RemoteSigned; .\setup-edustream.ps1

Write-Host "🚀 Setting up edustream project structure and files..." -ForegroundColor Green

$Src = "src"

# Create directories
$dirs = @(
    "app/providers",
    "app/layout",
    "components",
    "features/auth/ui", "features/auth/hooks", "features/auth/api",
    "features/cart/ui", "features/cart/hooks", "features/cart/api",
    "features/media/ui", "features/media/hooks", "features/media/canvas", "features/media/api",
    "features/validation/ui", "features/validation/hooks",
    "pages",
    "assets/images", "assets/icons",
    "utils",
    "types"
)

foreach ($dir in $dirs) {
    $path = Join-Path $Src $dir
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

# Helper function to create file
function New-File {
    param([string]$Path, [string]$Content)
    $fullPath = Join-Path $PSScriptRoot $Path
    $dirName = Split-Path $fullPath -Parent
    if (!(Test-Path $dirName)) { New-Item -ItemType Directory -Path $dirName | Out-Null }
    Set-Content -Path $fullPath -Value $Content -Encoding UTF8
}

# --- Files Content ---

$RouterJs = @"
'use strict';

import { useEffect, useState } from 'react';

const routes = new Map();

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    const handleLinkClick = (e) => {
      if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        window.history.pushState(null, '', href);
        setCurrentPath(href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick, true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const render = children.find((child) =>
      child.props.path === currentPath
    );
    if (!render) navigate('/404');
  }, [currentPath, children]);

  return <>{children.find((child) => child.props.path === currentPath) || null}</>;
}

export function Route({ path, children }) {
  return <>{children}</>;
}

export function useNavigate() {
  return (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
}
"@

$Home = @"
'use strict';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary-700">Welcome to EduStream</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Your learning journey starts here.</p>
    </div>
  );
}
"@

$Catalog = @"
'use strict';

export default function Catalog() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Course Catalog</h1>
      <p className="mt-2">Explore all available courses.</p>
    </div>
  );
}
"@

$CourseDetail = @"
'use strict';

export default function CourseDetail() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Course Details</h1>
      <p className="mt-2">Learn about this course.</p>
    </div>
  );
}
"@

$Checkout = @"
'use strict';

export default function Checkout() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2">Complete your purchase.</p>
    </div>
  );
}
"@

$Login = @"
'use strict';

export default function Login() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2">Sign in to your account.</p>
    </div>
  );
}
"@

$Signup = @"
'use strict';

export default function Signup() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <p className="mt-2">Create a new account.</p>
    </div>
  );
}
"@

$Profile = @"
'use strict';

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="mt-2">Manage your account settings.</p>
    </div>
  );
}
"@

$ThemeProvider = @"
'use strict';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeContext = React.createContext();

export const useTheme = () => React.useContext(ThemeContext);
"@

$AuthProvider = @"
'use strict';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
"@

$CartProvider = @"
'use strict';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (item) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
"@

$BaseLayout = @"
'use strict';

import { useTheme } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';

export default function BaseLayout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-light text-dark dark:bg-dark dark:text-light transition-colors duration-200">
      {/* Navbar */}
      <nav className="border-b dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href='/' className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              EduStream
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href='/' className="hover:text-primary-600 dark:hover:text-primary-300">Home</Link>
              <Link href='/catalog' className="hover:text-primary-600 dark:hover:text-primary-300">Catalog</Link>
              {user && <Link href='/profile' className="hover:text-primary-600 dark:hover:text-primary-300">Profile</Link>}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
                  <path d="M10 4v2m0 8v2M4.22 4.22l1.42 1.42m8.36 8.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.002 8.002 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            {/* Auth Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href='/login' className="text-sm hover:text-primary-600">Login</Link>
                <Link href='/signup' className="text-sm font-medium hover:text-primary-600">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EduStream. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Mock Link component for Router integration
function Link({ href, children, className = '' }) {
  return (
    <a href={href} className={`transition-colors \${className}`}>
      {children}
    </a>
  );
}
"@

# Write files
New-File "$Src/app/router.js" $RouterJs
New-File "$Src/pages/Home.jsx" $Home
New-File "$Src/pages/Catalog.jsx" $Catalog
New-File "$Src/pages/CourseDetail.jsx" $CourseDetail
New-File "$Src/pages/Checkout.jsx" $Checkout
New-File "$Src/pages/Login.jsx" $Login
New-File "$Src/pages/Signup.jsx" $Signup
New-File "$Src/pages/Profile.jsx" $Profile
New-File "$Src/app/providers/ThemeProvider.jsx" $ThemeProvider
New-File "$Src/app/providers/AuthProvider.jsx" $AuthProvider
New-File "$Src/app/providers/CartProvider.jsx" $CartProvider
New-File "$Src/app/layout/BaseLayout.jsx" $BaseLayout

Write-Host "✅ All files generated successfully!" -ForegroundColor Green
Write-Host "💡 Don't forget to:" -ForegroundColor Yellow
Write-Host "   1. Add CSS variables in src/index.css"
Write-Host "   2. Update vite.config.js and tailwind.config.js"
Write-Host "   3. Use 'import React from `"react`"' if not globally available"