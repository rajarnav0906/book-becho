import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader'; // Assuming the Loader component is imported
import Navbar from './Navbar';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/get-cart-books", { headers });
        const items = response.data.data;
        setCartItems(items);
        const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const clearCart = () => {
    // Simulate clearing cart (replace with backend call if needed)
    setCartItems([]);
    setTotal(0);
  };

  const removeBookFromCart = async (bookid) => {
    try {
      // Send the delete request to the backend
      const response = await axios.put(`http://localhost:4001/api/v1/remove-book-from-cart/${bookid}`, {}, { headers });
      console.log(response);

      // Filter out the removed book from the cartItems state
      setCartItems(prevItems => prevItems.filter(item => item._id !== bookid));

      // Update the total price
      const newTotal = cartItems.reduce((acc, item) => item._id !== bookid ? acc + item.price : acc, 0);
      setTotal(newTotal);
    } catch (error) {
      console.error("Error removing book from cart:", error);
    }
  };

  if (loading) return <Loader />; // Show loader while data is being fetched

  if (cartItems.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <Navbar />
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-30 blur-3xl animate-pulse z-0" />
        <h2 className="text-2xl font-semibold mb-2 z-10">Your Cart is Empty</h2>
        <p className="text-gray-400 text-sm z-10">Add some books to your cart to see them here.</p>
        <Link to="/books" className="mt-4 px-4 py-2 bg-[#b6d07a] text-black font-medium rounded hover:bg-[#a2bc68] transition z-10">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white relative">
      <Navbar />
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-20 blur-3xl animate-pulse z-0" />

      <div className="px-4 md:px-8 py-20 relative z-10">
        <h1 className="text-3xl font-bold text-center text-[#b6d07a] mb-10">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                <img src={item.url} alt={item.name} className="w-20 h-28 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <p className="text-sm text-[#b6d07a] font-medium mt-2">${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeBookFromCart(item._id)} className="text-red-500 hover:text-red-600">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}

            {/* Bottom Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <Link to="/books" className="text-sm text-[#b6d07a] hover:underline">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[#b6d07a]">Order Summary</h2>
            <div className="flex justify-between mb-3">
              <span className="text-gray-300">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-300">Shipping</span>
              <span className="text-[#b6d07a]">Free</span>
            </div>
            <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full py-2 rounded-lg bg-[#b6d07a] text-black font-semibold hover:bg-[#a2bc68] transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
