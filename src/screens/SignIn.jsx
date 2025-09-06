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
    email: "",
    password: "",
    rememberMe: false
  });
  const { login, isAuthenticated, isLoading, error: authError } = useAuth();
  const [error, setError] = useState("");

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      const { success, error } = await login(formData.email, formData.password);
      if (!success) {
        setError(error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error('Login error:', err);
    }
  };

  const ArrowIcon = () => (
    <img 
      src={arrowRightIcon} 
      alt="arrow" 
      className={`w-5 h-5 brightness-0 invert ${isLoading ? 'opacity-50' : ''}`} 
    />
  );

  // Display auth error from context if it exists
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

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
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl sm:w-[90vw] sm:max-w-md sm:min-h-80 xs:w-[95vw] xs:max-w-sm xs:p-5 xs:rounded-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col">
              <label 
                className="block mb-1 text-left"
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
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <label 
                  className="block"
                  style={{
                    ...AppFonts.mdSemiBold({ color: AppColors.black }),
                  }}
                >
                  Password<span className="text-red-500 ml-1">*</span>
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm"
                  style={{
                    ...AppFonts.smMedium({ color: AppColors.primary }),
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <InputField
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                disabled={isLoading}
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                disabled={isLoading}
              />
              <label 
                htmlFor="rememberMe" 
                className="ml-2 text-sm"
                style={{
                  ...AppFonts.smRegular({ color: AppColors.gray600 }),
                }}
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;