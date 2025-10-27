import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const TrendingCourses = ({ courses }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const AUTO_SCROLL_DELAY = 3000; // ms

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
    }, AUTO_SCROLL_DELAY);

    return () => resetTimeout();
  }, [current, courses.length]);

  return (
    <div className="relative w-full overflow-hidden z dark:bg-gray-900 text-gray-900 dark:text-gray-100 my-14 p-6">
      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {courses.map((course, idx) => (
          <div key={idx} className="w-full flex-shrink-0 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              {console.log(course.thumbnail)}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.instructor}
                </p>
                <p className="text-primary font-bold mt-2">{course.price}</p>
                <Link
                  to={`/course/${course.id}`}
                  className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {courses.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx
                ? "bg-primary"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? courses.length - 1 : prev - 1))
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={() =>
          setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
};

export default TrendingCourses;
