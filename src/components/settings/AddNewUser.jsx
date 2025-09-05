// src/components/settings/AddNewUser.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Camera, ChevronDown } from 'lucide-react';
import InputField from './InputField.jsx';
import SelectField from './SelectField.jsx';
import UserRoles from './UserRoles.jsx';
import Button from '../signIn/Button.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const AddNewUser = ({ onBack, onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    phoneNumber: '',
    emailAddress: '',
    userRole: '',
    status: true
  });

  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedCountryCode, setSelectedCountryCode] = useState('ae');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName || '',
        lastName: editingUser.lastName || '',
        dateOfBirth: editingUser.dateOfBirth || '',
        country: editingUser.country || '',
        city: editingUser.city || '',
        phoneNumber: editingUser.phoneNumber || '',
        emailAddress: editingUser.emailAddress || '',
        userRole: editingUser.userRole || '',
        status: editingUser.status !== undefined ? editingUser.status : true
      });
      setAvatar(editingUser.avatar || null);
    }
  }, [editingUser]);

  // Country code options
  const countryCodeOptions = [
    { code: 'ae', flag: '🇦🇪', dialCode: '+971', label: 'UAE' },
    { code: 'sa', flag: '🇸🇦', dialCode: '+966', label: 'Saudi Arabia' },
    { code: 'us', flag: '🇺🇸', dialCode: '+1', label: 'United States' }
  ];

  // Country options
  const countryOptions = [
    { value: 'uae', label: 'United Arab Emirates' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' }
  ];

  // City options (can be dynamic based on country)
  const cityOptions = [
    { value: 'dubai', label: 'Dubai' },
    { value: 'abudhabi', label: 'Abu Dhabi' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'ajman', label: 'Ajman' }
  ];

  const handleInputChange = (field, value) => {
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
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: !prev.status
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryCodeSelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
    setIsCountryDropdownOpen(false);
  };

  const getSelectedCountryCodeData = () => {
    return countryCodeOptions.find(option => option.code === selectedCountryCode);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.userRole) {
      newErrors.userRole = 'User role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        ...formData,
        avatar,
        name: `${formData.firstName} ${formData.lastName}`,
        // Map country and city values to display labels
        countryDisplay: countryOptions.find(c => c.value === formData.country)?.label || formData.country,
        cityDisplay: cityOptions.find(c => c.value === formData.city)?.label || formData.city
      };
      
      if (onSubmit) {
        onSubmit(userData);
      }
    }
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleBackToUsers = () => {
    if (onBack) {
      onBack();
    }
  };

  const getUserDisplayName = () => {
    if (editingUser && editingUser.name) {
      return editingUser.name;
    }
    if (editingUser) {
      return `${editingUser.firstName || ''} ${editingUser.lastName || ''}`.trim();
    }
    return 'Add New User';
  };

  const isEditing = !!editingUser;
  const selectedCountryData = getSelectedCountryCodeData();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleBackToUsers}
          className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          style={AppFonts.smSemiBold({ color: AppColors.text })}
        >
          System Users
        </button>
        <span 
          className="text-gray-400"
          style={AppFonts.smSemiBold({ color: AppColors.text })}
        >
          /
        </span>
        <span 
          className={isEditing ? "text-blue-500" : "text-blue-500"}
          style={AppFonts.smSemiBold({ 
            color: isEditing ? AppColors.primary : AppColors.primary 
          })}
        >
          {getUserDisplayName()}
        </span>
      </div>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 
          className="text-lg font-bold text-black"
          style={AppFonts.lgBold({ color: AppColors.black })}
        >
          General Details
        </h1>
      </div>

      {/* Form Content */}
      <div className="bg-white">
        <div className="space-y-8">
          {/* User Avatar Section with Status Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div 
                className="
                  relative 
                  bg-gray-800 
                  rounded-full 
                  flex items-center justify-center 
                  overflow-hidden
                  flex-shrink-0
                "
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '100px'
                }}
              >
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </div>
              
              <div>
                <h3 
                  className="text-black font-medium"
                  style={AppFonts.smSemiBold({ color: AppColors.black })}
                >
                  User Avatar
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="inline-block mt-2 cursor-pointer"
                >
                  <span
                    className="
                      px-4 py-2 rounded-full 
                      text-sm font-medium text-white
                      transition-colors
                      hover:opacity-90
                    "
                    style={{
                      backgroundColor: AppColors.primary,
                      ...AppFonts.smMedium({ color: AppColors.white })
                    }}
                  >
                    {isEditing ? 'Change Photo' : 'Upload'}
                  </span>
                </label>
              </div>
            </div>

            {/* Status Switch - moved to right side */}
            <div className="flex flex-col items-center">
             
              <div 
                className="w-24 h-24 bg-green-100 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                onClick={handleStatusToggle}
              >
                <span 
                  className="text-xs font-medium mb-2"
                  style={AppFonts.smMedium({ color: AppColors.black })}
                >
                  Status
                </span>
                <div 
                  className={`
                    w-12 h-6 rounded-full relative transition-colors duration-200
                    ${formData.status ? 'bg-green-500' : 'bg-gray-300'}
                  `}
                >
                  <div 
                    className={`
                      w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200
                      ${formData.status ? 'translate-x-6' : 'translate-x-0.5'}
                    `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First Name */}
            <InputField
              label="First Name"
              placeholder="Enter"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              error={errors.firstName}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              placeholder="Enter"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              error={errors.lastName}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              type="date"
              placeholder="Select"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              error={errors.dateOfBirth}
            />

            {/* Country */}
            <SelectField
              label="Country"
              placeholder="Select"
              value={formData.country}
              onChange={(option) => handleInputChange('country', option.value)}
              options={countryOptions}
              required
              error={errors.country}
            />

            {/* City */}
            <SelectField
              label="City"
              placeholder="Select"
              value={formData.city}
              onChange={(option) => handleInputChange('city', option.value)}
              options={cityOptions}
              required
              error={errors.city}
            />

            {/* Phone Number with Country Code Dropdown */}
            <div className="flex flex-col">
              <label 
                className="mb-2 text-sm font-medium text-black"
                style={AppFonts.smMedium({ color: AppColors.black })}
              >
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <div 
                    className={`
                      flex items-center px-3 h-12
                      bg-white border border-r-0 rounded-l-lg cursor-pointer
                      hover:bg-gray-50
                      ${errors.phoneNumber 
                        ? 'border-red-500' 
                        : 'border-gray-200'
                      }
                    `}
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  >
                    <span className="mr-2">{selectedCountryData?.flag}</span>
                    <span 
                      className="text-black font-medium mr-2"
                      style={AppFonts.smMedium({ color: AppColors.black })}
                    >
                      {selectedCountryData?.dialCode}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Dropdown Menu */}
                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                      {countryCodeOptions.map((option) => (
                        <div
                          key={option.code}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleCountryCodeSelect(option.code)}
                        >
                          <span className="mr-2">{option.flag}</span>
                          <span 
                            className="text-black font-medium mr-2"
                            style={AppFonts.smMedium({ color: AppColors.black })}
                          >
                            {option.dialCode}
                          </span>
                          <span 
                            className="text-gray-600 text-sm"
                            style={AppFonts.smRegular({ color: AppColors.gray })}
                          >
                            {option.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  placeholder="Enter"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`
                    flex-1 h-12 px-4
                    bg-white border border-l-0 rounded-r-lg
                    outline-none
                    ${errors.phoneNumber 
                      ? 'border-red-500' 
                      : 'border-gray-200'
                    }
                  `}
                  style={{
                    ...AppFonts.mdRegular({ color: AppColors.black })
                  }}
                />
              </div>
              {errors.phoneNumber && (
                <span 
                  className="mt-1 text-sm text-red-500"
                  style={{ color: AppColors.danger }}
                >
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            {/* Email Address */}
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              required
              error={errors.emailAddress}
            />
          </div>

          {/* User Roles Section */}
          <UserRoles
            label="User Roles"
            selectedRole={formData.userRole}
            onChange={(role) => handleInputChange('userRole', role)}
            required
            error={errors.userRole}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <div className="w-auto">
              <Button
                onClick={handleCancel}
                backgroundColor={AppColors.white}
                borderColor={AppColors.primary}
                textColor={AppColors.primary}
                showIcon={false}
                fullWidth={false}
                className="px-8 py-3 h-12 rounded-full"
              >
                Cancel
              </Button>
            </div>
            
            <div className="w-auto">
              <Button
                onClick={handleSubmit}
                backgroundColor={AppColors.primary}
                borderColor={AppColors.primary}
                textColor={AppColors.white}
                showIcon={false}
                fullWidth={false}
                className="px-8 py-3 h-12 rounded-full"
              >
                {isEditing ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isCountryDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default AddNewUser;