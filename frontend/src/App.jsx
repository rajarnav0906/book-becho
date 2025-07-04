import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import SignUp from "./components/SignUp";
import ViewBookDetails from "./components/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Profile from "./components/Profile";
import Favorites from "./Profile/Favorites";
import UserOrderHistory from "./Profile/UserOrderHistory";
import Settings from "./Profile/Settings";
import Cart from "./components/Cart";
import AllOrders from "./components/AllOrders";
import AddBooks from "./components/AddBooks";

function App() {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/book/:id" element={<ViewBookDetails />} />
      <Route path="/profile" element={<Profile />}>
        {role === "user" ? <Route index element={<Favorites />} /> : <Route index element={<AllOrders />} />}
        <Route path="/profile/order-history" element={<UserOrderHistory />} /> 
        <Route path="/profile/settings" element={<Settings />} /> 
        <Route path="/profile/add-book" element={<AddBooks />} /> 
      </Route>
      <Route path="/cart" element={<Cart />} />
      
    </Routes>
  );
}

export default App;
