import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./Login";
import { useForm } from "react-hook-form";

const cartoonBg = "/signUpImg.jpg";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-screen w-screen flex items-center justify-center sm:justify-end bg-slate-950 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover brightness-75 blur-sm"
        style={{ backgroundImage: `url(${cartoonBg})` }}
      ></div>

      {/* SignUp Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-900/20 text-white rounded-lg shadow-lg p-6 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] mx-4 sm:mr-16 relative z-10 backdrop-blur-md"
      >
        <h3 className="text-2xl font-semibold text-[#b6d07a] text-center">
          Create an Account
        </h3>
        <p className="text-gray-400 text-center text-sm mt-1">
          Join us and explore the world of books!
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              placeholder="Enter your address"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a] h-32"
              {...register("address", { required: true, minLength: 10 })}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1">
                Address must be at least 10 characters
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#b6d07a] text-black font-semibold py-2 rounded-md hover:bg-[#a5c068] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-[#b6d07a] hover:underline"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Log in
          </button>
          <Login />
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
