import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = ({ modalRef }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const loginModalRef = useRef(null); // Create a ref for the Login modal

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { username, password } = values;
    if (!username || !password) {
      alert("All fields required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/api/v1/log-in", values);
      
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Open login modal after successful login (if loginModalRef is passed)
      if (loginModalRef.current) {
        loginModalRef.current.showModal();
      }

      navigate("/profile");

      // Optionally, redirect to a different page after successful login
      // navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <dialog ref={modalRef} id="my_modal_3" className="modal">
      <div className="modal-box bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[400px] relative">
        {/* Close Button */}
        <form method="dialog">
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400 hover:text-white">
            ✕
          </Link>
        </form>

        {/* Modal Header */}
        <h3 className="text-2xl font-semibold text-[#b6d07a] text-center">Login</h3>
        <p className="text-gray-400 text-center text-sm mt-1">Welcome back! Please log in to continue.</p>

        {/* Login Form */}
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Enter your username"
              value={values.username}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]"
              placeholder="Enter your password"
              value={values.password}
              onChange={change}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#b6d07a] text-black font-semibold py-2 rounded-md hover:bg-[#a5c068] transition"
          >
            Log In
          </button>
        </form>

        {/* Sign-Up Link */}
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#b6d07a] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </dialog>
  );
};

export default Login;
