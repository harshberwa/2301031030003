import './App.css';
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './app/providers/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './app/providers/AuthProvider';
import { CartProvider } from './app/providers/CartProvider';
import { PurchaseProvider } from './app/providers/PurchaseProvider';
import { CourseContent } from '../src/pages/CourseContent';
import MyCourses from './pages/MyCourses';

function App() {
  return (
    <div className="App container h-full dark:bg-gray-800 font-normal">
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <PurchaseProvider>
          <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/CourseContent/:id" element={<CourseContent />} />
        </Routes>
        <Footer/>
        </PurchaseProvider>
        </CartProvider>
        </AuthProvider>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;