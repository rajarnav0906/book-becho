import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cartoonBg = "/signUpImg.jpg";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const loginModalRef = useRef(null); // 👈 Create a ref for the Login modal

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password, address } = values;
      if (!username || !email || !password || !address) {
        alert("All fields required!");
      } else {
        const response = await axios.post("http://localhost:4001/api/v1/signup", values);
        console.log(response.data);

        // 👇 Open login modal after successful signup
        if (loginModalRef.current) {
          loginModalRef.current.showModal();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
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

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              value={values.username}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              value={values.email}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              value={values.password}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a] h-32"
              value={values.address}
              onChange={change}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#b6d07a] text-black font-semibold py-2 rounded-md hover:bg-[#a5c068] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-[#b6d07a] hover:underline"
            onClick={() => loginModalRef.current?.showModal()}
          >
            Log in
          </button>
        </p>

        {/* 👇 Pass ref to Login */}
        <Login modalRef={loginModalRef} />
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
