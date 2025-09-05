import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setIsImageLoaded(true);
        setImage(generatedImage);
      }
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <motion.div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Generator</h1>
          <p className="text-gray-600 mb-8">Transform your text into stunning visuals</p>
          
          <div className="relative mb-8">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img 
                src={image} 
                alt="Generated content" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-70' : 'opacity-100'}`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
                animate={{ width: loading ? '100%' : '0%' }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </div>
            {loading && (
              <p className="mt-4 text-sm text-gray-500">Generating your image...</p>
            )}
          </div>

          {!isImageLoaded ? (
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <div className="relative">
                <input
                  onChange={e => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Describe your idea, and AI will generate it!"
                  className="w-full px-6 py-4 pr-32 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bg-gradient-to-r from-pink-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-md transition-all disabled:opacity-70"
                >
                  Generate
                </button>
              </div>
              <p className="text-sm text-gray-500">Example: "A futuristic city at sunset, digital art"</p>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsImageLoaded(false)}
                className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-all"
              >
                Generate Another
              </button>
              <a 
                href={image} 
                download="artifex-ai-image.png"
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-full hover:shadow-md transition-all text-center"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Result;