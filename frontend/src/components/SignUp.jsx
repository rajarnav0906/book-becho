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
  } = useForm()

  const onSubmit = (data) => console.log(data)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade in from below
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Fade out to top
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
      className="h-screen w-screen flex items-center justify-center sm:justify-end bg-slate-950 relative overflow-hidden"
    >
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover brightness-75 blur-sm" 
        style={{ backgroundImage: `url(${cartoonBg})` }}
      ></div>

      {/* SignUp Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} // Start smaller & fade in
        animate={{ scale: 1, opacity: 1 }} // Expand & fully appear
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth pop-up effect
        className="bg-gray-900/20 text-white rounded-lg shadow-lg p-6 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] mx-4 sm:mr-16 relative z-10 backdrop-blur-md"
      >
        <h3 className="text-2xl font-semibold text-[#b6d07a] text-center">Create an Account</h3>
        <p className="text-gray-400 text-center text-sm mt-1">
          Join us and explore the world of books!
        </p>

        {/* Sign-Up Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Create a password"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Confirm your password"
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-[#b6d07a] text-black font-semibold py-2 rounded-md hover:bg-[#a5c068] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button className="text-[#b6d07a] hover:underline"
          onClick={() => document.getElementById("my_modal_3").showModal()}>
            Log in
          </button>
          <Login />
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
