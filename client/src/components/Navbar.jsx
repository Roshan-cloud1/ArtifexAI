import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useAppContext();
  const navigate = useNavigate();
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const dropdownRef = useRef(null);
  let hoverTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsProfileHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsProfileHovered(false);
    }, 300); // 300ms delay before closing
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Increased logo size here */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={assets.logo} alt="logo" className="h-20" /> {/* Changed from h-10 to h-16 */}
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <motion.button
                  onClick={() => navigate('/result')}
                  className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img className="w-5" src={assets.credit_star} alt="credit" />
                  <span className="text-sm font-medium text-gray-700">{credit} Credits</span>
                </motion.button>

                <div 
                  className="relative group"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div 
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={assets.profile_icon} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                      alt="profile" 
                    />
                    <span className="text-sm font-medium text-gray-700 hidden md:inline">{user.name}</span>
                  </motion.div>
                  
                  {isProfileHovered && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        onClick={() => navigate('/result')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Generate Image
                      </button>
                      <button
                        onClick={() => navigate('/buy')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Buy Credits
                      </button>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/buy')}
                  className="hidden md:block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </button>
                <motion.button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 text-sm rounded-full hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;