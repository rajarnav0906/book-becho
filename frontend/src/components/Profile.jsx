import React, { useEffect, useState } from 'react';
import SideBar from '../Profile/SideBar.jsx';
import { Outlet } from 'react-router-dom';
import axios from "axios";
import Loader from './Loader';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`
        };
        const response = await axios.get("http://localhost:4001/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] text-white px-4 md:px-10 py-6 gap-6">
      
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <SideBar data={profile} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-[#111] shadow-md p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
