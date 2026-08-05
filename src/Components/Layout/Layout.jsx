import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const authRoutes = ["/login", "/register", "/forgetpassword", "/resetpassword"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="container px-3 md:px-2 mx-auto max-w-screen-xl">
        <Outlet />
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}
