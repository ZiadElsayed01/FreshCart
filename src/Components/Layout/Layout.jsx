import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const authRoutes = ["/login", "/register", "/forgetpassword", "/resetpassword"];
  const isAuthPage = authRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="px-6 mx-auto min-w-screen-xl">
        <Outlet />
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}
