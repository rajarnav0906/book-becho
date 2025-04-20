import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const SideBar = ({ data, modalRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  // Handle logout functionality
  const handleLogout = () => {
    // Clear user data from localStorage or other storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    // Dispatch logout action to Redux store
    dispatch(authActions.logout());

    // Close the sidebar
    closeSidebar();

    // Redirect to the home page
    navigate('/'); // Redirect to home page after logout

    // Show the login modal (if applicable)
    if (modalRef.current) {
      modalRef.current.showModal(); // This will open the login modal
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button (Top Bar) */}
      <div className="md:hidden flex items-center justify-start bg-[#111] px-4 py-3 border-b border-[#2a2a2a] shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-[#b6d07a] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-[#111] text-white fixed z-40 top-0 left-0 h-full w-64 border-r border-[#2a2a2a] shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 pt-8 md:pt-6 flex flex-col h-full justify-between">
          {/* Profile Section */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={data.avatar}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#b6d07a]"
            />
            <div>
              <span className="block text-gray-300 font-medium">{data?.username || 'User'}</span>
              <span className="block text-gray-300 text-sm">{data?.email || 'Email'}</span>
            </div>
          </div>

          {/* Separator Bar */}
          <div className="border-t border-[#2a2a2a] my-4"></div>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <Link
              to="/"
              onClick={closeSidebar}
              className="block px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
            >
              🏠 Home
            </Link>
            <Link
              to="/books"
              onClick={closeSidebar}
              className="block px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
            >
              🔍 Browse Books
            </Link>
            <Link
              to="/profile"
              onClick={closeSidebar}
              className="block px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
            >
              ❤️ Favorites
            </Link>
            <Link
              to="/profile/order-history"
              onClick={closeSidebar}
              className="block px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
            >
              🛒 Order History
            </Link>
            <Link
              to="/profile/settings"
              onClick={closeSidebar}
              className="block px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
            >
              ⚙️ Settings
            </Link>
          </nav>

          {/* Logout Button at the bottom */}
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 mt-auto text-white text-left"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;
