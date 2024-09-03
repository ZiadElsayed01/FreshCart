import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-10 px-3 md:px-2 mx-auto max-w-screen-xl">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
