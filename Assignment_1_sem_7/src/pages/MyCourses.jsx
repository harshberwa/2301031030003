// src/pages/MyCourses.jsx
import React from 'react';
import { useTheme } from '../app/providers/ThemeProvider';
import DarkModeToggle from '../components/DarkModeToggle';
import TrendingCourses from '../components/TrendingCourses';
import { usePurchase } from '../app/providers/PurchaseProvider'; // We'll create this provider

function MyCourses() {
  const { theme } = useTheme();
  const { purchasedCourses } = usePurchase(); // Fetch courses purchased by user

  return (
    <div className="p-6 dark:">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          My Courses
        </h2>
        {/* <DarkModeToggle /> */}
      </div>

      {purchasedCourses.length > 0 ? (
        <TrendingCourses courses={purchasedCourses} />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          You haven't purchased any courses yet.
        </p>
      )}
    </div>
  );
}

export default MyCourses;
