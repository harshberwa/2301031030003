// src/pages/CourseDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../app/providers/CartProvider";
import { usePurchase } from "../app/providers/PurchaseProvider";

const courses = [
  {
    id: 1,
    title: "React Basics",
    instructor: "Darshan Hiragar",
    thumbnail: "../assets/images/react.png",
    description:
      "Learn the fundamentals of React, including components, hooks, and state management.",
    price: "₹499",
  },
  {
    id: 2,
    title: "Tailwind CSS Mastery",
    instructor: "Hiragar Dev",
    thumbnail: "../assets/images/tailwind.png",
    description:
      "Master Tailwind CSS and build modern, responsive UIs quickly and efficiently.",
    price: "₹399",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    instructor: "Code Mentor",
    thumbnail: "../assets/images//AdvJs.png",
    description:
      "Deep dive into advanced concepts of JavaScript, closures, async/await, and more.",
    price: "₹599",
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { purchasedCourses } = usePurchase();

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <p className="text-center mt-10">Course not found</p>;
  }

  const isPurchased = purchasedCourses.some((c) => c.id === course.id);

  const handleStartCourse = () => {
    navigate(`/CourseContent/${course.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-16 p-6 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
        {course.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Instructor: {course.instructor}
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-200">
        {course.description}
      </p>
      <p className="text-xl font-semibold text-primary mt-4">{course.price}</p>

      {isPurchased ? (
        <button
          onClick={handleStartCourse}
          className="mt-6 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Start Course
        </button>
      ) : (
        <button
          onClick={() => addToCart(course)}
          className="mt-6 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default CourseDetail;
