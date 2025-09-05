import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';     
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-200 shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-sm font-medium text-blue-600">Best Transform Words into Art</p>
            <img src={assets.star_icon} alt="" className="w-4 h-4" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-bold mt-8 max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-gray-900">Say it.</span>{' '}
            <span className="text-gray-900">See it.</span>{' '}
            <span className="text-gray-900">Create it</span>{' '}
            <span className="text-gray-500">— with</span>{' '}
            <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">ArtifexAI</span>
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Unleash boundless creativity with AI - Turn your thoughts into stunning visual art instantly. Just type, and watch the magic unfold.
          </motion.p>

          <motion.button 
            onClick={onClickHandler}
            className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Generate Image
            <img src={assets.star_group} alt="" className="h-6 animate-pulse" />
          </motion.button>

          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            {Array(3).fill('').map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={assets[`sample_img_${(index % 3) + 1}`]}
                  alt={`sample-${index + 1}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-xs truncate w-full">AI Generated Art</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            className="mt-6 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Generated Images from ArtifexAI
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-pink-100 opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Header;