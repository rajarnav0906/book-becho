import React, { useEffect, useState } from "react";
import SideBar from "../Profile/SideBar.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(
          "http://localhost:4001/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-8">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#1a1a1a]" />

      {/* Gradient Glow Balls */}
      {/* Theme-Based Gradient Glow Balls */}
      <div className="absolute top-[-180px] right-[-180px] w-[350px] h-[350px] bg-[#6fc1ff33] rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-160px] left-[-160px] w-[320px] h-[320px] bg-[#b6d07a33] rounded-full blur-3xl z-0" />
      <div className="absolute top-[20%] left-[-100px] w-[220px] h-[220px] bg-[#b6d07a22] rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[20%] right-[-120px] w-[260px] h-[260px] bg-[#6fc1ff22] rounded-full blur-3xl z-0" />
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[180px] h-[180px] bg-[#b6d07a1a] rounded-full blur-3xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 text-white">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <SideBar data={profile} />
        </div>

        {/* Outlet Section */}
        <div className="flex-1 bg-[#111] shadow-2xl border border-[#222] rounded-xl p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
