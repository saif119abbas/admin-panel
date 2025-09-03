//src\screens\SignIn.jsx
import { useState,useEffect } from 'react';
import InputField from '../components/signIn/InputField.jsx';
import Button from '../components/signIn/Button.jsx';
import Checkbox from '../components/signIn/Checkbox.jsx';
import AppColors from '../utils/AppColors.js';
import AppFonts from '../utils/AppFonts.js';
import '../css/signin.css';
import logoImage from '../assets/images/logo.png';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import { useAuth } from '../context/AuthContext.js'
import { useNavigate } from "react-router-dom";;

const SignIn = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "user@example.com",
    password: "User@123",
    rememberMe: false
  });
  const { login,isAuthenticated } = useAuth();
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
    <img src={arrowRightIcon} alt="arrow" className="w-5 h-5 signin-button-arrow" />
  );

  return (
    <div className="signin-container">
      <div className="signin-content">
      
        <div className="logo-container">
          <img src={logoImage} alt="TipMe Logo" className="logo" />
        </div>

       
        <div className="welcome-text">
          <h1 style={AppFonts.h3({ color: AppColors.white })}>
            Hi, Welcome Back to TipMe
          </h1>
          <p style={AppFonts.mdMedium({ color: AppColors.white, opacity: '0.9' })}>
            Enter your email address and password<br />to login your account.
          </p>
        </div>

       
        <div className="signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label 
                className="block mb-1" 
                style={{
                  ...AppFonts.mdSemiBold({ color: AppColors.black }),
                  textAlign: 'left'
                }}
              >
                Username/Email<span style={{ color: AppColors.danger, marginLeft: '4px' }}>*</span>
              </label>
              <InputField
                type="email"
                placeholder="Enter"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                className="input-placeholder"
              />
            </div>

            <div className="form-group">
              <div className="password-group">
                <div className="password-header">
                  <label 
                    className="password-label"
                    style={AppFonts.mdSemiBold({ color: AppColors.black })}
                  >
                    Password<span style={{ color: AppColors.danger }}>*</span>
                  </label>
                  <a 
                    href="#" 
                    className="forgot-password"
                    style={AppFonts.mdSemiBold({ 
                      color: AppColors.secondary,
                      textDecoration: 'underline'
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
                  className="input-placeholder"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                label="Remember Me"
              />
            </div>

            <div className="form-group">
              <Button
                type="submit"
                backgroundColor={AppColors.primary}
                borderColor={AppColors.primary}
                textColor={AppColors.white}
                icon={<ArrowIcon />}
                iconPosition="right"
                showIcon={true}
                fullWidth={false}
                className="signin-button"
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