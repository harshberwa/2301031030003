// src/components/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../app/providers/CartProvider";

const CourseCard = ({ course }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">
        {course.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {course.instructor}
      </p>
      <p className="text-primary font-bold mt-2">{course.price}</p>

      <div className="flex justify-between mt-3">
        <Link
          to={`/course/${course.id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(course)}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/80"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
