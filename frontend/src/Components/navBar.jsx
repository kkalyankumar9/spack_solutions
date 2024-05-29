import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../Redux/Auth/action';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((store) => store.AuthReducer.token);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlelogOut = () => {
    dispatch(logoutUser())
    toast.success("You have successfully Logout.")
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 sticky top-0 z-50 m-0 p-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-lg md:text-4xl">
                MOVIES NOW
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-2xl md:text-base font-medium">
                  Home
                </Link>
                <Link to="/subscribtion_plans" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-2xl md:text-base font-medium">
                  Plans
                </Link>
                {isAuth ? (
                  <button onClick={handlelogOut} className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-2xl md:text-base font-medium">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-2xl md:text-base font-medium">
                      Registration
                    </Link>
                    <Link to="/login" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-2xl md:text-base font-medium">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleMenu} type="button" className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-white hover:text-gray-100 block px-3 py-2 rounded-md text-lg md:text-base font-medium">
                Home
              </Link>
              <Link to="/subscribtion_plans" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-lg md:text-base font-medium">
                  Plans
                </Link>
              {isAuth ? (
                <button onClick={handlelogOut} className="text-white hover:text-gray-100 block px-3 py-2 rounded-md text-lg md:text-base font-medium">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="text-white hover:text-gray-100 block px-3 py-2 rounded-md text-lg md:text-base font-medium">
                    Registration
                  </Link>
                  <Link to="/login" className="text-white hover:text-gray-100 block px-3 py-2 rounded-md text-lg md:text-base font-medium">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
