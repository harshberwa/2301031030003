import React from 'react'
import { useTheme } from '../app/providers/ThemeProvider';
import DarkModeToggle from '../components/DarkModeToggle';
import TrendingCourses from '../components/TrendingCourses';


const demoCourses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "John Doe",
    price: "₹799",
    thumbnail: "../assets/images/react.png",
  },
  {
    id: 2,
    title: "Mastering Tailwind",
    instructor: "Jane Smith",
    price: "₹599",
    thumbnail: "../assets/images/tailwind.png",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    instructor: "Ravi Kumar",
    price: "₹999",
    thumbnail: "../assets/images/AdvJs.png",
  },
];
function Home() {
   
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800  mb-4">
        Trending Courses
      </h2>
      <TrendingCourses courses={demoCourses} />
    </div>
  );
}

export default Home
