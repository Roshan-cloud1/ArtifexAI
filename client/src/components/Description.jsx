import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";

const Description = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Generate AI Images</h1>
          <p className="text-lg text-gray-600">Bring Your Creative Vision to Life</p>
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={assets.sample_img_1} 
                alt="AI generated sample" 
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-medium">"A futuristic city at sunset" - AI Generated</p>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-2xl border-2 border-blue-200"></div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Introducing ArtifexAI - Your Ultimate Text to Image Generator
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Effortlessly bring your ideas to life with our free AI image Generator. Transform your text into stunning visuals in seconds. Imagine, describe, and see your vision come to life instantly.
              </p>
              <p>
                Type a text prompt and our advanced AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even non-existent concepts come to life effortlessly. Unleash limitless creativity with our AI technology.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Fast Generation</span>
              </div>
              <div className="flex items-center gap-3 bg-pink-50 px-4 py-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">High Quality</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Description;