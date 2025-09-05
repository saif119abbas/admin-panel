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
  const { login, isAuthenticated } = useAuth();

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  useEffect(
    function () {
      if (isAuthenticated) navigate("/admin", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    console.log('Sign in attempt:', formData);
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
        <div className="bg-white rounded-3xl p-6 w-full max-w-md h-80 shadow-xl flex flex-col justify-center sm:w-[90vw] sm:max-w-md sm:h-auto sm:min-h-80 xs:w-[95vw] xs:max-w-sm xs:p-5 xs:rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full justify-between">
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
                placeholder="Enter"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
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
                  placeholder="Enter"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
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
                showIcon={true}
                fullWidth={false}
                className="!w-full !max-w-md !h-12 !bg-cyan-400 !border-cyan-400 !border-2 !rounded-full !text-white !flex !items-center !justify-center !gap-2 !font-medium !text-base !cursor-pointer !transition-all !duration-200 !p-0 hover:!opacity-90 sm:!max-w-md xs:!max-w-sm"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;