import React, { useState } from "react";
import { Menu, X, User, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Placements", href: "/all-placements" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <Link className="flex items-center" to="/">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Briefcase className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">
                  Hirequest
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <User className="h-5 w-5" />
                    <span className="ml-2">{user.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <User className="h-5 w-5" />
                    <span className="ml-2">Login</span>
                  </Link>
                  <Link
                    to="/sign-up"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              {user ? (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Profile
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
