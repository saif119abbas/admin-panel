import React, { useState } from 'react';
import InputField from '../components/signIn/InputField.jsx';
import Button from '../components/signIn/Button.jsx';
import Checkbox from '../components/signIn/Checkbox.jsx';
import '../css/signin.css';
import logoImage from '../assets/images/logo.png';
import arrowRightIcon from '../assets/icons/arrow-right.svg';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempt:', formData);
  };

  const ArrowIcon = () => (
    <img src={arrowRightIcon} alt="arrow" className="w-5 h-5 signin-button-arrow" />
  );

  return (
    <div className="signin-container">
      <div className="signin-content">
        {/* Logo */}
        <div className="logo-container">
          <img src={logoImage} alt="TipMe Logo" className="logo" />
        </div>

        {/* Welcome Text */}
        <div className="welcome-text">
          <h1>Hi, Welcome Back to TipMe</h1>
          <p>Enter your email address and password<br />to login your account.</p>
        </div>

        {/* Sign In Form */}
        <div className="signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <InputField
                type="email"
                label="Username/Email"
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
                  <label className="password-label">
                    Password<span className="text-red-500 ml-1">*</span>
                  </label>
                  <a href="#" className="forgot-password">Forget Password?</a>
                </div>
                <input
                  type="password"
                  placeholder="Enter"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className="input-placeholder"
                  style={{
                    width: '100%',
                    maxWidth: '402px',
                    height: '50px',
                    border: '1px solid #E5E5E5',
                    borderRadius: '8px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
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
                backgroundColor="#05CBE7"
                borderColor="#05CBE7"
                textColor="white"
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