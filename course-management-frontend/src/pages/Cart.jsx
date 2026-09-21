import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (String(item.id) === String(id)) {
        return {
          ...item,
          quantity: (item.quantity || 1) + 1,
        };
      }

      return item;
    });

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (String(item.id) === String(id)) {
          return {
            ...item,
            quantity: (item.quantity || 1) - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  // Remove course
  const removeCourse = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    saveCart(updatedCart);

    toast.success("Course removed from cart");
  };

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);

    toast.success("Cart cleared");
  };

  // Total quantity
  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.cPrice) * (item.quantity || 1),
    0
  );

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 p-6">

        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>

        <p className="mb-6 text-gray-500">
          You have not added any courses yet.
        </p>

        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Cart
            </h1>

            <p className="mt-1 text-gray-500">
              {totalItems} course
              {totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Courses */}
          <div className="lg:col-span-2">

            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
              >

                {/* Image */}
                <img
                  src={item.cImg}
                  alt={item.cName}
                  className="h-32 w-full rounded-lg object-cover sm:w-40"
                />

                {/* Details */}
                <div className="flex-1">

                  <h2 className="text-xl font-bold text-gray-800">
                    {item.cName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    👨‍🏫 {item.cTrainer}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ⏱ {item.cDuration}
                  </p>

                  <p className="mt-2 text-lg font-bold text-green-600">
                    ₹{item.cPrice}
                  </p>

                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="h-9 w-9 rounded-lg bg-gray-200 text-lg font-bold hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="w-6 text-center font-bold">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="h-9 w-9 rounded-lg bg-blue-600 text-lg font-bold text-white hover:bg-blue-700"
                  >
                    +
                  </button>

                </div>

                {/* Remove */}
                <button
                  onClick={() => removeCourse(item.id)}
                  className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Order Summary
            </h2>

            <div className="mb-4 flex justify-between text-gray-600">
              <span>Courses</span>
              <span>{totalItems}</span>
            </div>

            <div className="mb-4 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="mb-6 border-t pt-4">

              <div className="flex justify-between">

                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-xl font-bold text-green-600">
                  ₹{totalPrice}
                </span>

              </div>

            </div>

            <button
              onClick={() =>
                toast.success("Checkout successful!")
              }
              className="mb-3 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
            >
              Checkout
            </button>

            <Link
              to="/"
              className="block w-full rounded-lg border border-blue-600 py-3 text-center font-semibold text-blue-600 hover:bg-blue-50"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;