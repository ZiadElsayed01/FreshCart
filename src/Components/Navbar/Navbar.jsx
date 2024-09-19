import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";

export default function Navbar() {
  const [user, setUser] = useState(
    () => localStorage.getItem("userToken") || null
  );
  let { wishItems, getUserWish } = useContext(WishContext);
  let { cartItems, getUserCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUser(token);
  }, [localStorage.getItem("userToken")]);

  useEffect(() => {
    getUserWish();
    getUserCart();
  }, [user, getUserWish, getUserCart]);

  function handleSignout() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-100 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto px-3 py-4 justify-center lg:justify-between">
          <div className="flex items-center gap-3 mb-3 lg:mb-0 flex-col md:flex-row">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} width={120} className="h-8" alt="Logo" />
            </Link>
            {user && (
              <ul className="flex gap-3 items-center">
                <li>
                  <NavLink to="/" className="text-lg">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="text-lg">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="text-lg">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="text-lg">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allorders" className="text-lg">
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="icons flex gap-3 items-center">
              <i className="fa-brands fa-instagram text-emerald-600"></i>
              <i className="fa-brands fa-facebook text-emerald-600"></i>
              <i className="fa-brands fa-tiktok text-emerald-600"></i>
              <i className="fa-brands fa-twitter text-emerald-600"></i>
              <i className="fa-brands fa-linkedin text-emerald-600"></i>
              <i className="fa-brands fa-youtube text-emerald-600"></i>
            </div>
            <div className="links flex gap-3 items-center">
              {user ? (
                <>
                  <NavLink to="/wishlist" className="text-lg relative mr-3">
                    <i className="fa-solid fa-heart"></i>
                    <div className="text-md absolute top-[-10px] right-[-15px] w-6 h-6 bg-emerald-600 flex items-center justify-center text-white rounded-full">
                      {wishItems || 0}
                    </div>
                  </NavLink>
                  <NavLink to="/cart" className="text-lg relative mr-3">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className="text-md absolute top-[-10px] right-[-15px] w-6 h-6 bg-emerald-600 flex items-center justify-center text-white rounded-full">
                      {cartItems || 0}
                    </div>
                  </NavLink>
                  <button
                    onClick={handleSignout}
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
