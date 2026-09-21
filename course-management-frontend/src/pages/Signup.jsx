import React, { useState } from "react";
import { v4 as randomId } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: "",
  });

  let { username, password, confirmPassword, email, gender } = formData;

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      let data = {
        ...formData,
        id: randomId(),
        role: "user",
      };

      let already = await axios.get(
        `https://course-management-system-w77d.onrender.com/users?email=${email}`
      );

      let alreadyExists = already.data.length > 0;

      if (alreadyExists) {
        toast.error("User already exists");
      } else {
        let res = await axios.post(
          "https://course-management-system-w77d.onrender.com/users",
          data
        );

        if (res.status == 201) {
          toast.success("User Created Successfully");
          navigate("/login");
        } else {
          toast.error("User cannot be created");
        }
      }

      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Create an Account
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Sign up to start learning today
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={handleChange}
            name="username"
            placeholder="Enter your username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            onChange={handleChange}
            value={confirmPassword}
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Gender
          </label>

          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                checked={gender === "male"}
                onChange={handleChange}
                value="male"
                name="gender"
                className="h-4 w-4 accent-blue-600"
              />
              Male
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                checked={gender === "female"}
                onChange={handleChange}
                value="female"
                name="gender"
                className="h-4 w-4 accent-blue-600"
              />
              Female
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
        >
          Sign Up
        </button>
      </div>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
