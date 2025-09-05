import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <img 
            src={assets.logo} 
            alt="ArtifexAI Logo" 
            className="h-20 mb-4"
          />
          <p className="text-gray-400 text-sm mb-4 max-w-md">
            Transform your imagination into stunning AI-generated artwork
          </p>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} ArtifexAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;