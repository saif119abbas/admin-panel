// src/screens/SignIn.jsx
import { useState, useEffect } from 'react';
import InputField from '../components/signIn/InputField.jsx';
import Button from '../components/signIn/Button.jsx';
import Checkbox from '../components/signIn/Checkbox.jsx';
import AppColors from '../utils/AppColors.js';
import AppFonts from '../utils/AppFonts.js';
import logoImage from '../assets/images/logo.png';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import backgroundImage from '../assets/images/background.svg';
import { useAuth } from '../context/AuthContext.js'
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "user@example.com",
    password: "User@123",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated, navigate]);

  // Handle remember me checkbox change
  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password, formData.rememberMe);
      console.log('Sign in successful');
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const ArrowIcon = () => (
    <img 
      src={arrowRightIcon} 
      alt="arrow" 
      className="w-5 h-5 brightness-0 invert" 
    />
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-5 sm:p-4 xs:p-3"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Logo Container */}
        <div className="mb-10">
          <img 
            src={logoImage} 
            alt="TipMe Logo" 
            className="h-20 w-auto sm:h-15 xs:h-12" 
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-10 sm:mb-8 xs:mb-8 text-white">
          <h1 
            className="mb-3 leading-tight"
            style={AppFonts.h3({ color: AppColors.white })}
          >
            Hi, Welcome Back to TipMe
          </h1>
          <p 
            className="leading-relaxed opacity-90"
            style={AppFonts.mdMedium({ color: AppColors.white, opacity: '0.9' })}
          >
            Enter your email address and password<br />
            to login your account.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl flex flex-col justify-center sm:w-[90vw] sm:max-w-md sm:h-auto sm:min-h-80 xs:w-[95vw] xs:max-w-sm xs:p-5 xs:rounded-xl">
          {/* Error message display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col">
              <label 
                className="block mb-2 text-left"
                style={{
                  ...AppFonts.mdSemiBold({ color: AppColors.black }),
                }}
              >
                Username/Email<span className="text-red-500 ml-1">*</span>
              </label>
              <InputField
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                className="border-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label 
                    className="password-label"
                    style={AppFonts.mdSemiBold({ color: AppColors.black })}
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  <a 
                    href="#" 
                    className="text-right transition-opacity duration-200 hover:opacity-80 underline"
                    style={AppFonts.mdSemiBold({ 
                      color: AppColors.secondary,
                    })}
                  >
                    Forget Password?
                  </a>
                </div>
                <InputField
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  className="border-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex flex-col">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                label="Remember Me"
                className="text-cyan-600 focus:ring-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col">
              <Button
                 type="submit"
                 backgroundColor={AppColors.primary}
                 borderColor={AppColors.primary}
                 textColor={AppColors.white}
                 icon={<ArrowIcon />}
                 iconPosition="right"
                 showIcon= {!isLoading}
                 fullWidth={false}
                 className="!w-full !max-w-md !h-12 !bg-cyan-400 !border-cyan-400 !border-2 !rounded-full !text-white !flex !items-center !justify-center !gap-2 !font-medium !text-base !cursor-pointer !transition-all !duration-200 !p-0 hover:!opacity-90 sm:!max-w-md xs:!max-w-sm"
                 disabled={isLoading}
               >
                {isLoading ? 'Signing In ...' : 'Sign In'}
               </Button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;