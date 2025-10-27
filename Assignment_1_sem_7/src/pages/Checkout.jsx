// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../app/providers/CartProvider';
import { usePurchase } from '../app/providers/PurchaseProvider';
import { useNavigate } from 'react-router-dom'; 

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { purchaseCourse } = usePurchase();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return; // safeguard
    cart.forEach(course => purchaseCourse(course)); // Save purchased courses
    clearCart();
    navigate('/my-courses'); // Redirect to My Courses page
  };

  return (
    <div className="p-6 flex justify-center flex-col h-screen items-center">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Your cart is empty.
        </p>
      ) : (
        <>
        <ul className="mb-4">
          {cart.map(course => (
            <li key={course.id} className="mb-2">
              {course.title} - {course.price}
            </li>
          ))}
        </ul>
      <button
        className={`px-4 py-2 rounded text-white ${
          cart.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </button>
      </>
      )}

    </div>
  );
};

export default Checkout;
