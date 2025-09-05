import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initpay = async (order) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'ArtifexAI Credits',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razor',
            response,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success('Credits Added Successfully!');
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      theme: {
        color: '#6366f1'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razor',
        {
          planId,
          userId: user._id
        },
        { headers: { token } }
      );

      if (data.success) {
        initpay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

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
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-gray-200 shadow-sm mb-6">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm font-medium">Pricing Plans</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get more credits and generate unlimited AI images</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((item, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden border ${index === 1 ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <img src={assets.logo_icon} alt="" className="w-10 h-10" />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${index === 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.credits} Credits</h3>
                <p className="text-gray-600 text-sm mb-6">{item.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">₹{item.price}</span>
                  <span className="text-gray-500"> / one-time</span>
                </div>
                <button
                  onClick={() => paymentRazorpay(item.id)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${index === 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Get Started
                </button>
              </div>
              <div className="border-t border-gray-200 px-8 py-4 bg-gray-50">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {item.credits} AI image generations
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    High resolution downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Commercial usage rights
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyCredit;