// src/app/providers/PurchaseProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  // Load from localStorage on initial render
  const [purchasedCourses, setPurchasedCourses] = useState(() => {
    const saved = localStorage.getItem('purchasedCourses');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever purchasedCourses changes
  useEffect(() => {
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
  }, [purchasedCourses]);

  const purchaseCourse = (course) => {
    setPurchasedCourses((prev) => [...prev, course]);
  };

  const clearPurchases = () => {
    setPurchasedCourses([]);
    localStorage.removeItem('purchasedCourses');
  };

  return (
    <PurchaseContext.Provider
      value={{ purchasedCourses, purchaseCourse, clearPurchases }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => useContext(PurchaseContext);
