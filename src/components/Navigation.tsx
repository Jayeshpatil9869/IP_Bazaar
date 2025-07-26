import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex-shrink-0 flex items-center">
              <Shield
                className={`h-8 w-8 mr-2 transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              />
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                IPV4Bazaar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? isScrolled
                        ? "text-primary border-b-2 border-primary"
                        : "text-white border-b-2 border-white"
                      : isScrolled
                      ? "text-gray-700 hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-white/80"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-3 mt-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors duration-300 mt-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
