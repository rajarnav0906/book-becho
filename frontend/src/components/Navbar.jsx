import React, { useState, useEffect } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(authActions.logout());
    navigate("/");
  };

  const links = [
    { name: "Home", path: "/", type: "text" },
    { name: "Books", path: "/books", type: "text" },
    { name: "Contact", path: "/contact", type: "text" },
    { name: "About", path: "/about", type: "text" },
    { name: "Cart", path: "/cart", type: "icon", icon: "cart" },
    { name: "Profile", path: "/profile", type: "icon", icon: "profile" },
    { name: "Admin-Profile", path: "/profile", type: "icon", icon: "adminProfile" },
  ];

  if (!isLoggedIn) {
    links.splice(4, 2); // Remove Cart and Profile links if not logged in
  }

  if (isLoggedIn && role === "user") {
    links.splice(6, 1); // Remove admin profile if user
  }

  if (isLoggedIn && role === "admin") {
    links.splice(5, 1); // Remove normal profile if admin
  }

  return (
    <div
      className={`fixed z-50 top-0 left-0 right-0 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-900 bg-opacity-30"
      }`}
    >
      <div className="max-w-screen-full container mx-auto md:px-20 px-4">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links
                  .filter((link) => link.type === "text")
                  .map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <a className="btn btn-ghost text-3xl md:text-2xl text-[#b6d07a]">
              literaryLane
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links
                .filter((link) => link.type === "text")
                .map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="navbar-end space-x-3">
            {isLoggedIn && (
              <div className="flex items-center gap-3">
                {links
                  .filter((link) => link.type === "icon")
                  .map((link, index) => {
                    if (link.icon === "cart") {
                      return (
                        <Link to={link.path} key={index} className="relative group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 fill-[#a6adbb]"
                            viewBox="0 0 32 32"
                          >
                            <path d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z" />
                            <circle cx="14" cy="26" r="2" />
                            <circle cx="24" cy="26" r="2" />
                          </svg>
                        </Link>
                      );
                    }

                    if (link.icon === "profile") {
                      return (
                        <Link to="/profile" key={index}>
                          <div className="btn btn-ghost btn-circle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-7 h-7 fill-[#a6adbb]"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                          </div>
                        </Link>
                      );
                    }

                    if (link.icon === "adminProfile") {
                      return (
                        <Link to="/profile" key={index}>
                          <div className="btn btn-ghost btn-circle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-7 h-7 fill-[#facc15]"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2a7 7 0 0 1 7 7v1.586l1.707 1.707A1 1 0 0 1 20.293 14H3.707a1 1 0 0 1-.707-1.707L4.707 10.586V9a7 7 0 0 1 7-7zm0 2a5 5 0 0 0-5 5v1h10V9a5 5 0 0 0-5-5zm-1 9v6h2v-6h-2z" />
                            </svg>
                          </div>
                        </Link>
                      );
                    }

                    return null;
                  })}
              </div>
            )}

            {!isLoggedIn && (
              <div>
                <a
                  className="btn hover:bg-[#b6d07a] hover:text-black"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  LogIn
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
