import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Artifex AI Works</h1>
          <p className="text-lg text-gray-600">Transform Imagination into Images in 3 Simple Steps</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stepsData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <img src={item.icon} alt="" className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-blue-600 px-3 py-1 bg-blue-50 rounded-full">Step {index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-gray-200 shadow-sm">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span className="text-sm font-medium">Fast and easy to use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;