import { useContext, useEffect, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  Menu,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../Context/ThemeContext";

export default function Navbar() {
  const [user, setUser] = useState(
    () => localStorage.getItem("userToken") || null,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let { wishItems, getUserWish } = useContext(WishContext);
  let { cartItems, getUserCart } = useContext(CartContext);
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUser(token);
  }, [localStorage.getItem("userToken")]);

  useEffect(() => {
    if (user) {
      getUserWish();
      getUserCart();
    }
  }, [user, getUserWish, getUserCart]);

  function handleSignout() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
    setMobileMenuOpen(false);
  }

  const navLinks = user
    ? [
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/categories", label: "Categories" },
        { to: "/brands", label: "Brands" },
        { to: "/allorders", label: "Orders" },
      ]
    : [];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto min-w-screen-xl px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                width={120}
                className="h-8"
                alt="FreshCart Logo"
              />
            </Link>

            {/* Desktop Navigation */}
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 ">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:block"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {user ? (
                <>
                  <NavLink to="/wishlist" className="relative hidden md:block">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                      {wishItems > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {wishItems}
                        </Badge>
                      )}
                    </Button>
                  </NavLink>
                  <NavLink to="/cart" className="relative hidden md:block">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItems > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {cartItems}
                        </Badge>
                      )}
                    </Button>
                  </NavLink>
                  <Button
                    variant="ghost"
                    className="hidden md:block"
                    size="icon"
                    onClick={handleSignout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet
          className="bg-background z-50 min-h-screen"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <SheetContent
            side="right"
            className="w-[300px] bg-background z-50"
            onClose={() => setMobileMenuOpen(false)}
          >
            <SheetHeader>
              <div className="flex items-center">
                <img
                  src={logo}
                  width={120}
                  className="h-8"
                  alt="FreshCart Logo"
                />
              </div>
            </SheetHeader>
            <div className="flex flex-col bg-background z-50">
              {/* Mobile Navigation */}
              {user && (
                <nav className="flex flex-col space-y-2 bg-background z-50 py-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "text-sm font-medium transition-colors hover:text-primary py-2",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              )}

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2 pt-4 border-t w-full">
                {user ? (
                  <>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-1/3"
                        onClick={() =>
                          setTheme(theme === "light" ? "dark" : "light")
                        }
                      >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>

                      <NavLink
                        to="/wishlist"
                        className="w-1/3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-full p-0"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          {wishItems > 0 && (
                            <Badge variant="secondary" className="ml-auto">
                              {wishItems}
                            </Badge>
                          )}
                        </Button>
                      </NavLink>

                      <NavLink
                        to="/cart"
                        className="w-1/3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="ghost" className="w-full p-0">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {cartItems > 0 && (
                            <Badge variant="secondary" className="ml-auto">
                              {cartItems}
                            </Badge>
                          )}
                        </Button>
                      </NavLink>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive px-2"
                      onClick={handleSignout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
