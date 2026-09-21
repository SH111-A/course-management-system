import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { CourseProvider } from "../context/CourseContext";

const CourseCard = ({ data }) => {
  const { user } = useContext(UserProvider);
  const { deleteById } = useContext(CourseProvider);

  const [isAdded, setIsAdded] = useState(false);

  // Check whether this course is already in cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(
      (item) => String(item.id) === String(data.id)
    );

    setIsAdded(exists);
  }, [data.id]);

  // Add course to cart
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(
      (item) => String(item.id) === String(data.id)
    );

    if (exists) {
      setIsAdded(true);
      return;
    }

    const updatedCart = [
      ...cart,
      {
        ...data,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setIsAdded(true);

    toast.success("Course added to cart");
  };

  // Remove course from cart
  const removeFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(data.id)
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setIsAdded(false);

    toast.success("Course removed from cart");
  };

  return (
    <div className="w-full sm:w-[300px] overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Course Image */}
      <img
        src={data.cImg}
        alt={data.cName}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        {/* Course Name */}
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          {data.cName}
        </h2>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
          {data.cDesc}
        </p>

        {/* Duration and Trainer */}
        <div className="mb-4 flex flex-wrap gap-2 text-sm">

          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-600">
            ⏱ {data.cDuration}
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-600">
            👨‍🏫 {data.cTrainer}
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xl font-bold text-green-600">
            ₹{data.cPrice}
          </span>
        </div>

        {/* USER */}
        {user?.role === "user" && (
          <div className="mt-4 flex flex-wrap gap-2">

            {/* View Course */}
            <Link
              to={`/course/${data.id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Course
            </Link>

            {/* Add To Cart */}
            {!isAdded && (
              <button
                onClick={addToCart}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Add to Cart
              </button>
            )}

            {/* Remove From Cart */}
            {isAdded && (
              <button
                onClick={removeFromCart}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Remove from Cart
              </button>
            )}

          </div>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <div className="mt-4 flex flex-wrap gap-2">

            {/* Update */}
            <Link
              to={`/update/${data.id}`}
              className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-700"
            >
              Update
            </Link>

            {/* Delete */}
            <button
              onClick={() => deleteById(data.id)}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Delete
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default CourseCard;