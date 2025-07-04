import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader.jsx'; // ✅ using your Loader

function Settings() {
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get('http://localhost:4001/api/v1/get-user-information', { headers });
      setUserData(res.data);
      setAddress(res.data.address || '');
      console.log('User data fetched:', res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateAddress = async () => {
    if (address.trim() === '') {
      alert('Address cannot be empty.');
      return;
    }

    setUpdating(true);

    try {
      await axios.put('http://localhost:4001/api/v1/update-address', { address }, { headers });
      console.log('Address updated');
      await fetchUserData(); // refresh user data after update
    } catch (error) {
      console.error('Error updating address:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-[#141414] text-gray-200 p-10 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#b6d07a] mb-10">Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Info */}
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block text-gray-400">Username</label>
              <input
                type="text"
                value={userData?.username || ''}
                disabled
                className="w-full bg-[#222] p-3 rounded-lg text-gray-300 outline-none"
              />
            </div>

            <div>
              <label className="text-sm mb-2 block text-gray-400">Email</label>
              <input
                type="email"
                value={userData?.email || ''}
                disabled
                className="w-full bg-[#222] p-3 rounded-lg text-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Right - Address */}
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block text-gray-400">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={5}
                placeholder="Enter your address"
                className="w-full bg-[#222] p-3 rounded-lg text-gray-300 outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpdateAddress}
                disabled={updating}
                className="bg-[#b6d07a] hover:bg-[#a6c067] text-black font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                {updating ? 'Updating...' : 'Update Address'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;
