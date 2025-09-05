import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Login from '../components/Login';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [credit, setCredit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Memoized function to load credits data
  const loadCreditsData = useCallback(async () => {
    if (!token) {
      console.log("⏭️ No token available, skipping credits load");
      return;
    }

    setIsLoading(true);
    console.log("🔄 Starting to load credits data...");

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token }
      });

      console.log("📊 Credits data response:", data);

      if (data?.success) {
        setUser(data.user);
        setCredit(data.credits);
        console.log("✅ Successfully updated user and credits");
      } else {
        console.warn("⚠️ Credits load unsuccessful:", data?.message);
        if (data?.message?.toLowerCase().includes('invalid token')) {
          logout();
        }
      }
    } catch (error) {
      console.error("❌ Error loading credits:", error);
      toast.error(error.response?.data?.message || 'Failed to load credits');
      
      // If token is invalid, logout the user
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, backendUrl]);

  // Generate image with proper error handling
  const generateImage = useCallback(async (prompt) => {
    if (!token) {
      setShowLogin(true);
      toast.info('Please login to generate images');
      return null;
    }

    if (!prompt?.trim()) {
      toast.error('Please enter a description');
      return null;
    }

    setIsLoading(true);
    console.log("🎨 Generating image for prompt:", prompt);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      console.log("🖼️ Image generation response:", data);

      if (data.success) {
        toast.success('Image generated successfully!');
        await loadCreditsData(); // Refresh credits after generation
        return data.resultImage;
      } else {
        toast.error(data.message || 'Failed to generate image');
        
        // Handle insufficient credits
        if (data.creditBalance === 0) {
          toast.info('You have no credits left. Please purchase more.');
          navigate('/buy');
        }
        return null;
      }
    } catch (error) {
      console.error("❌ Image generation error:", error);
      toast.error(error.response?.data?.message || 'Image generation failed');
      
      // Handle token expiration
      if (error.response?.status === 401) {
        logout();
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [token, backendUrl, loadCreditsData, navigate]);

  // Clean logout function
  const logout = useCallback(() => {
    console.log("👋 Logging out user");
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(0);
    toast.success('Logged out successfully');
  }, []);

  // Effect to load credits when token changes
  useEffect(() => {
    console.log("🔑 Token changed, current token:", token ? '*****' + token.slice(-5) : 'none');
    
    if (token) {
      localStorage.setItem('token', token);
      loadCreditsData();
    } else {
      localStorage.removeItem('token');
    }
  }, [token, loadCreditsData]);

  // Debugging effect for user state
  useEffect(() => {
    console.log("👤 User state updated:", user);
  }, [user]);

  // Debugging effect for credit state
  useEffect(() => {
    console.log("💰 Credit balance updated:", credit);
  }, [credit]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
    isLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {showLogin && <Login />}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};