//src\screens\ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from '../components/signIn/InputField.jsx';
import Button from '../components/signIn/Button.jsx';
import AppColors from '../utils/AppColors.js';
import AppFonts from '../utils/AppFonts.js';
import logoImage from '../assets/images/logo.png';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import backgroundImage from '../assets/images/background.svg';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePasswordStrength = (password) => {
    const requirements = [
      { test: /.{8,}/, message: "At least 8 characters" },
      { test: /[A-Z]/, message: "One uppercase letter" },
      { test: /[a-z]/, message: "One lowercase letter" },
      { test: /\d/, message: "One number" },
      { test: /[!@#$%^&*(),.?":{}|<>]/, message: "One special character" }
    ];

    const passed = requirements.filter(req => req.test.test(password));
    const failed = requirements.filter(req => !req.test.test(password));
    
    setPasswordStrength({
      score: passed.length,
      feedback: failed.map(req => req.message)
    });

    return passed.length >= 5; 
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const EyeIcon = ({ isVisible, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
    >
      {isVisible ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      )}
    </button>
  );

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    if (field === 'newPassword') {
      validatePasswordStrength(value);
    }

    if (field === 'confirmPassword' || (field === 'newPassword' && formData.confirmPassword)) {
      const newPass = field === 'newPassword' ? value : formData.newPassword;
      const confirmPass = field === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (confirmPass && newPass !== confirmPass) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePasswordStrength(formData.newPassword)) {
      newErrors.newPassword = 'Password does not meet security requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // const response = await resetPassword(token, formData.newPassword);
      
      setIsSuccess(true);

      
    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token exists 
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/signin', { replace: true });
  //   }
  // }, [token, navigate]);


  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return '#ef4444'; 
    if (passwordStrength.score <= 3) return '#f59e0b'; 
    return '#10b981'; 
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Medium';
    return 'Strong';
  };

  const ArrowIcon = () => (
    <img 
      src={arrowRightIcon} 
      alt="arrow" 
      className="w-5 h-5 brightness-0 invert" 
    />
  );

  const handleGoToSignIn = () => {
    navigate('/signin', { replace: true });
  };

  if (isSuccess) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-5 sm:p-4 xs:p-3"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="mb-10">
            <img 
              src={logoImage} 
              alt="TipMe Logo" 
              className="h-20 w-auto sm:h-15 xs:h-12" 
            />
          </div>
          
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={AppFonts.h4({ color: AppColors.black })} className="mb-2">
                Password Reset Successfully!
              </h2>
              <p style={AppFonts.mdMedium({ color: AppColors.text })} className="opacity-70">
                Your password has been reset successfully. Click the button below to go to the sign in page.
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={handleGoToSignIn}
                backgroundColor={AppColors.primary}
                borderColor={AppColors.primary}
                textColor={AppColors.white}
                icon={<ArrowIcon />}
                iconPosition="right"
                showIcon={true}
                fullWidth={false}
                className="!w-full !max-w-md !h-12 !bg-cyan-400 !border-cyan-400 !border-2 !rounded-full !text-white !flex !items-center !justify-center !gap-2 !font-medium !text-base !cursor-pointer !transition-all !duration-200 !p-0 hover:!opacity-90 sm:!max-w-md xs:!max-w-sm"
              >
                Go to Sign In now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Reset Your Password
          </h1>
          <p 
            className="leading-relaxed opacity-90"
            style={AppFonts.mdMedium({ color: AppColors.white, opacity: '0.9' })}
          >
            Create a new secure password for<br />
            your TipMe account.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl sm:w-[90vw] sm:max-w-md xs:w-[95vw] xs:max-w-sm xs:p-5 xs:rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p style={AppFonts.smMedium({ color: '#ef4444' })}>
                  {errors.general}
                </p>
              </div>
            )}

            {/* New Password Input */}
            <div className="flex flex-col">
              <label 
                className="block mb-1 text-left"
                style={AppFonts.mdSemiBold({ color: AppColors.black })}
              >
                New Password<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <InputField
                  type={showPasswords.newPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleInputChange('newPassword')}
                  className={`pr-12 ${errors.newPassword ? 'border-red-500' : ''}`}
                  required
                />
                <EyeIcon 
                  isVisible={showPasswords.newPassword} 
                  onClick={() => togglePasswordVisibility('newPassword')} 
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1" style={AppFonts.smMedium()}>
                  {errors.newPassword}
                </p>
              )}
              
              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      />
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getPasswordStrengthColor() }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <p style={AppFonts.smMedium()}>Password should include:</p>
                      <ul className="text-xs mt-1 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span className="text-red-500">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col">
              <label 
                className="block mb-1 text-left"
                style={AppFonts.mdSemiBold({ color: AppColors.black })}
              >
                Confirm Password<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <InputField
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  className={`pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  required
                />
                <EyeIcon 
                  isVisible={showPasswords.confirmPassword} 
                  onClick={() => togglePasswordVisibility('confirmPassword')} 
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1" style={AppFonts.smMedium()}>
                  {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword && !errors.confirmPassword && formData.newPassword === formData.confirmPassword && (
                <p className="text-green-500 text-sm mt-1 flex items-center gap-1" style={AppFonts.smMedium()}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Passwords match
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col mt-4">
              <Button
                type="submit"
                backgroundColor={AppColors.primary}
                borderColor={AppColors.primary}
                textColor={AppColors.white}
                icon={!isLoading ? <ArrowIcon /> : null}
                iconPosition="right"
                showIcon={!isLoading}
                fullWidth={false}
                disabled={isLoading}
                className="!w-full !max-w-md !h-12 !bg-cyan-400 !border-cyan-400 !border-2 !rounded-full !text-white !flex !items-center !justify-center !gap-2 !font-medium !text-base !cursor-pointer !transition-all !duration-200 !p-0 hover:!opacity-90 sm:!max-w-md xs:!max-w-sm disabled:!opacity-50 disabled:!cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>

            {/* Back to Sign In Link */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="text-cyan-400 hover:opacity-80 transition-opacity duration-200"
                style={AppFonts.mdMedium()}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;