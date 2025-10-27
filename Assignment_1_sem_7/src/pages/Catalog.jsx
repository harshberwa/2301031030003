// src/pages/Catalog.jsx
import React from "react";
import CourseCard from "../components/CourseCard";

const courses = [
  {
    id: 1,
    title: "React Basics",
    instructor: "Darshan Hiragar",
    thumbnail: ".../assets/images/react.png",
    price: "₹499",
  },
  {
    id: 2,
    title: "Tailwind CSS Mastery",
    instructor: "Hiragar Dev",
    thumbnail: ".../assets/images/tailwind.png",
    price: "₹399",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    instructor: "Code Mentor",
    thumbnail: ".../assets/images/js-course.jpg",
    price: "₹599",
  }
];

const Catalog = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 my-24">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Explore Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
