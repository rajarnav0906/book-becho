import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Loader from "../components/Loader.jsx";

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/order-history", { headers });
        setOrderHistory(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader />
      </div>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-10">
        You have not placed any orders yet.
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] p-6">
      <h2 className="text-2xl font-bold text-[#b6d07a] mb-8 text-center">Your Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm lg:text-base text-left text-gray-300">
          <thead className="uppercase bg-[#222] text-[#b6d07a] text-xs">
            <tr>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold w-[120px] sm:w-[150px]">Book</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Author</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Condition</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Price</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">COD</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Status</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Order Date</th>
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Order Time</th> {/* Added Order Time */}
            </tr>
          </thead>
          <tbody className="bg-[#1a1a1a] divide-y divide-[#333]">
            {orderHistory.map((order) => (
              <tr key={order._id} className="hover:bg-[#2a2a2a] transition-all">
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap truncate max-w-[120px] sm:max-w-[150px]" title={order.book?.title}>
                  <Link to={`/book/${order.book._id}`} className="text-[#b6d07a] hover:underline text-xs sm:text-sm">
                    {order.book?.title || "N/A"}
                  </Link>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{order.book?.author || "Unknown"}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{order.book?.condition || "N/A"}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">&#8377;{order.book?.price || "0"}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <span className="px-2 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs sm:text-sm font-medium">
                    COD
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    order.status === "order placed" ? "bg-yellow-600/20 text-yellow-400" :
                    order.status === "out for delivery" ? "bg-orange-600/20 text-orange-400" :
                    order.status === "delivered" ? "bg-green-600/20 text-green-400" :
                    order.status === "cancelled" ? "bg-red-600/20 text-red-400" :
                    "bg-gray-600/20 text-gray-400"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                {/* Displaying formatted time in 24-hour format */}
                <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrderHistory;
