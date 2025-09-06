// src/components/settings/AddNewUser.jsx
import React, { useState, useEffect } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import { useUser } from '../../context/UserContext.jsx';
import userService from '../../services/userService.js';
import InputField from './InputField.jsx';
import SelectField from './SelectField.jsx';
import UserRoles from './UserRoles.jsx';
import Button from '../signIn/Button.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const AddNewUser = ({ onBack, onSubmit, editingUser }) => {
  // Get user context data and actions
  const {
    addUser,
    updateUser,
    validateUserData,
    loading,
    error,
    clearError,
    countries,
    cities,
    isLoadingCountries,
    isLoadingCities,
    fetchCountries,
    fetchCitiesByCountry,
    getCountryName,
    getCityName
  } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    country: '',
    city: '',
    mobileNumber: '',
    emailAddress: '',
    userRole: '',
    status: true,
    password: '',
    confirmPassword: ''
  });

  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries.length, fetchCountries]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (editingUser) {
      const mobileSource = editingUser.mobileNumber || '';
      const phoneNumber = mobileSource.substring(3);
      const countryCode = mobileSource.substring(0, 3) || '+971';

      setFormData({
        firstName: editingUser.firstName || editingUser.fullName?.split(' ')[0] || '',
        lastName: editingUser.lastName || editingUser.fullName?.split(' ').slice(1).join(' ') || '',
        birthdate: editingUser.birthdate || '',
        country: editingUser.country || '',
        city: editingUser.city || '',
        mobileNumber: phoneNumber,
        emailAddress: editingUser.emailAddress || editingUser.email || '',
        userRole: editingUser.type?.toString() || '',
        status: editingUser.status === 1 ? true : false
      });
      setAvatar(editingUser.avatar || null);
      setSelectedCountryCode(countryCode);

      if (editingUser.country) {
        fetchCitiesByCountry(editingUser.country);
        const ctry = countries.find(c => c.id === editingUser.country);
        setSelectedCountryCode(ctry?.phoneCode || countryCode);
      } else {
        setSelectedCountryCode(countryCode);
      }
    }
  }, [editingUser, fetchCitiesByCountry, countries]);

  const countryOptions = countries.map(country => ({
    value: country.id,
    label: `${country.name} ${country.code ? `(${country.code})` : ''}`
  }));

  const cityOptions = cities.map(city => ({
    value: city.id,
    label: city.name
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'country') {
      setFormData(prev => ({
        ...prev,
        city: ''
      }));

      if (value) {
        fetchCitiesByCountry(value);
        const ctry = countries.find(c => c.id === value);
        if (ctry?.phoneCode) setSelectedCountryCode(ctry.phoneCode);
      }
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleStatusToggle = () => {
    if (!isSubmitting) {
      setFormData(prev => ({
        ...prev,
        status: !prev.status
      }));
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Please select a valid image file'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: 'File size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        if (errors.avatar) {
          setErrors(prev => ({
            ...prev,
            avatar: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryCodeSelect = (country) => {
    setSelectedCountryCode(country.phoneCode || country.code);
    setIsCountryDropdownOpen(false);
  };

  const getSelectedCountryCodeData = () => {
    if (!countries || countries.length === 0) return null;
    const byForm = countries.find(option => option.id === formData.country);
    if (byForm) return byForm;
    return countries.find(option => option.phoneCode === selectedCountryCode) || countries[0];
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const validation = validateUserData(formData, !editingUser);

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthdate: formData.birthdate,
        countryId: formData.country,
        cityId: formData.city,
        email: formData.emailAddress,
        mobileNumber: `${selectedCountryCode}${formData.mobileNumber}`,
        type: parseInt(formData.userRole),
        status: formData.status ? 1 : 0,
        image: avatar
      };

      if (!editingUser) {
        userData.password = formData.password;
        userData.confirmPassword = formData.confirmPassword;
      }
      let savedUser;
      if (editingUser) {
        savedUser = await userService.updateUserProfile(editingUser.id, userData);
      } else {
        savedUser = await userService.createUser(userData);
      }

      if (onSubmit) {
        onSubmit(savedUser);
      }

      if (onBack) {
        onBack(true);
      }

    } catch (error) {
      console.error('Error saving user:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to save user. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
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
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="avatar-upload"
                  className={`inline-block mt-2 ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
                className={`w-24 h-24 bg-green-100 rounded-lg flex flex-col items-center justify-center ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
              disabled={isSubmitting}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              placeholder="Enter"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              error={errors.lastName}
              disabled={isSubmitting}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              type="date"
              placeholder="Select"
              value={formData.birthdate}
              onChange={(e) => handleInputChange('birthdate', e.target.value)}
              required
              error={errors.birthdate}
              disabled={isSubmitting}
              onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
              readOnly={false}
            />

            {/* Country */}
            <SelectField
              label="Country"
              options={countryOptions}
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              required
              error={errors.country}
              disabled={isLoadingCountries || isSubmitting}
              loading={isLoadingCountries}
              placeholder={isLoadingCountries ? 'Loading countries...' : 'Select a country'}
            />

            {/* City */}
            <SelectField
              label="City"
              options={cityOptions}
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              required
              error={errors.city}
              disabled={!formData.country || isLoadingCities || isSubmitting}
              loading={isLoadingCities}
              placeholder={!formData.country ? 'Select a country first' : (isLoadingCities ? 'Loading cities...' : 'Select a city')}
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

              {/* Phone Field Container with consistent width */}
              <div className={`
                w-full h-12
                bg-white border rounded-lg
                ${errors.mobileNumber
                  ? 'border-red-500'
                  : 'border-gray-200'
                }
             `}>
                <div className="flex h-full p-2">
                  <div className="relative">
                    <div
                      className={`
                        flex items-center px-2 h-full
                        bg-gray-100 rounded-md
                        hover:bg-gray-200
                        ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      `}
                      onClick={!isSubmitting ? () => setIsCountryDropdownOpen(!isCountryDropdownOpen) : undefined}
                    >
                      <div
                        className="w-6 h-4 mr-2 overflow-hidden flex items-center justify-center"
                        style={{ borderRadius: '4px' }}
                      >
                        <span className="text-sm">{selectedCountryData?.flag}</span>
                      </div>
                      <span
                        className="text-black font-medium mr-1 text-sm"
                        style={AppFonts.smMedium({ color: AppColors.black })}
                      >
                        {selectedCountryData?.phoneCode || selectedCountryCode}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>

                    {isCountryDropdownOpen && !isSubmitting && (
                      <div className="absolute top-full left-0 z-50 mt-1" style={{ minWidth: '200px' }}>
                        <div
                          className="bg-gray-100 rounded-lg shadow-lg"
                          style={{
                            border: '6px solid #f3f4f6',
                            borderRadius: '12px'
                          }}
                        >
                          <div className="bg-white rounded-md overflow-hidden max-h-64 overflow-y-auto">
                            {countries.map((option) => (
                              <div
                                key={option.phoneCode || option.id}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCountryCodeSelect(option)}
                              >
                                <div
                                  className="w-6 h-4 mr-2 overflow-hidden flex items-center justify-center"
                                  style={{ borderRadius: '4px' }}
                                >
                                  <span className="text-sm">{option.flag}</span>
                                </div>
                                <span
                                  className="text-black font-medium mr-2"
                                  style={AppFonts.smMedium({ color: AppColors.black })}
                                >
                                  {option.phoneCode || ''}
                                </span>
                                <span
                                  className="text-gray-600 text-sm"
                                  style={AppFonts.smRegular({ color: AppColors.gray })}
                                >
                                  {option.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    placeholder="Enter 9 digits"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      // Only allow digits and limit to 9 characters
                      const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                      handleInputChange('mobileNumber', value);
                    }}
                    required
                    maxLength={9}
                    pattern="[0-9]{9}"
                    disabled={isSubmitting || isEditing} // Disable in edit mode
                    className={`
                      flex-1 h-full px-3 ml-2
                      bg-transparent border-none
                      outline-none
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    style={{
                      ...AppFonts.mdRegular({ color: AppColors.black })
                    }}
                  />
                </div>
              </div>

              {errors.mobileNumber && (
                <span
                  className="mt-1 text-sm text-red-500"
                  style={{ color: AppColors.danger }}
                >
                  {errors.mobileNumber}
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
              disabled={isSubmitting || isEditing} // Disable in edit mode
            />

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              placeholder="Enter"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              error={errors.password}
              disabled={isSubmitting}
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Enter"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
              error={errors.confirmPassword}
              disabled={isSubmitting}
            />
          </div>

          {/* User Roles Section */}
          <UserRoles
            label="User Roles"
            selectedRole={formData.userRole}
            onChange={(role) => handleInputChange('userRole', role)}
            required
            error={errors.userRole}
            disabled={isSubmitting}
          />

          {/* Avatar Error */}
          {errors.avatar && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.avatar}</p>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Context Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (isEditing ? 'Update' : 'Submit')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isCountryDropdownOpen && !isSubmitting && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default AddNewUser;