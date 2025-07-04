import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

// Lucide Icons
import { Home, BookOpen, Heart, History, Settings, LogOut, Menu, X, PlusCircle, ClipboardList } from 'lucide-react';

const SideBar = ({ data, modalRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role); // inside component

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    closeSidebar();
    navigate('/');
    if (modalRef?.current) modalRef.current.showModal();
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-start bg-[#111] px-4 py-3 border-b border-[#2a2a2a] shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-[#b6d07a]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`bg-[#111] text-white fixed z-40 top-0 left-0 h-full w-64 border-r border-[#2a2a2a] shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 pt-8 md:pt-6 flex flex-col h-full justify-between">

          {/* Profile Info */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={data.avatar}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#b6d07a]"
            />
            <div>
              <span className="block text-white font-semibold">{data?.username || 'User'}</span>
              <span className="block text-sm text-gray-400">{data?.email || 'Email'}</span>
            </div>
          </div>

          {/* Links */}
          <div className="border-t border-[#2a2a2a] my-4"></div>
          <nav className="space-y-3">

            <SidebarLink to="/" label="Home" icon={<Home className="w-5 h-5" />} close={closeSidebar} />
            <SidebarLink to="/books" label="Browse Books" icon={<BookOpen className="w-5 h-5" />} close={closeSidebar} />

            {role === 'admin' ? (
              <>
                <SidebarLink to="/profile" label="All Orders" icon={<ClipboardList className="w-5 h-5" />} close={closeSidebar} />
                <SidebarLink to="/profile/add-book" label="Add Book" icon={<PlusCircle className="w-5 h-5" />} close={closeSidebar} />
              </>
            ) : (
              <>
                <SidebarLink to="/profile" label="Favorites" icon={<Heart className="w-5 h-5" />} close={closeSidebar} />
                <SidebarLink to="/profile/order-history" label="Order History" icon={<History className="w-5 h-5" />} close={closeSidebar} />
                <SidebarLink to="/profile/settings" label="Settings" icon={<Settings className="w-5 h-5" />} close={closeSidebar} />
              </>
            )}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 mt-auto text-left hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

const SidebarLink = ({ to, label, icon, close }) => (
  <Link
    to={to}
    onClick={close}
    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#1f1f1f] hover:text-[#b6d07a] transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default SideBar;
