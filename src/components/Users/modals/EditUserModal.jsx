// src/components/Users/modals/EditUserModal.jsx
import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useUser } from '../../../context/UserContext.jsx';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const {
    updateUser,
    countries,
    cities,
    fetchCountries,
    fetchCitiesByCountry,
    getCountryName,
    getCityName,
    getUserRoleEnumValue,
    getUserStatusEnumValue,
    loading
  } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    emailAddress: '',
    mobileNumber: '',
    country: '',
    city: '',
    userRole: '',
    status: 'Active',
  });

  const [isVerified, setIsVerified] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load countries when modal opens
  useEffect(() => {
    console.log('=== EditUserModal useEffect triggered ===');
    console.log('isOpen:', isOpen);
    console.log('countries length:', countries.length);
    
    if (isOpen && countries.length === 0) {
      fetchCountries();
    }
  }, [isOpen, countries.length, fetchCountries]);

  useEffect(() => {
    console.log('=== EditUserModal useEffect triggered ===');
    console.log('user prop:', user);
    console.log('countries length:', countries.length);
    
    if (user) {
      // Parse mobile number: +962790000000 -> +962 and 790000000
      const mobileSource = user.mobileNumber || '';
      console.log('Original mobileNumber:', mobileSource);
      
      let countryCode = '+971'; // Default
      let phoneNumber = '';
      
      if (mobileSource.startsWith('+')) {
        // Simple: always take first 4 characters as country code
        countryCode = mobileSource.substring(0, 4); // +962
        phoneNumber = mobileSource.substring(4);    // 790000000
        console.log('Country code:', countryCode, 'Phone number:', phoneNumber);
      } else {
        phoneNumber = mobileSource;
      }
      
      console.log('Final country code:', countryCode);
      console.log('Final phone number:', phoneNumber);
      
      const userCountry = countries.find(c => c.id === user.country);
      
      setFormData({
        firstName: user.firstName || user.fullName?.split(' ')[0] || '',
        lastName: user.lastName || user.fullName?.split(' ').slice(1).join(' ') || '',
        birthdate: user.birthdate || '',
        country: user.country || '',
        city: user.city || '',
        mobileNumber: phoneNumber,
        emailAddress: user.emailAddress || user.email || '',
        userRole: user.type?.toString() || '', // Convert 0 -> "0" for Super Admin
        status: user.status === 1 ? 'Active' : 'Inactive'
      });
      
      // Set country code from user's country or parsed code
      const finalCountryCode = userCountry?.phoneCode || countryCode;
      console.log('Setting selectedCountryCode to:', finalCountryCode);
      setSelectedCountryCode(finalCountryCode);
      
      // Load cities for the user's country
      if (user.country) {
        fetchCitiesByCountry(user.country);
      }
    } else {
      console.log('No user data provided to EditUserModal');
    }
  }, [user, countries, fetchCitiesByCountry]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'mobileNumber' || field === 'countryCode') {
      setIsVerified(false);
    }

    if (field === 'country') {
      fetchCitiesByCountry(value);
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  const handleCountryCodeSelect = (country) => {
    setSelectedCountryCode(country.phoneCode || country.code);
    setIsDropdownOpen(false);
    setIsVerified(false);
  };

  const handleVerifyPhone = () => {
    console.log('Verifying phone:', selectedCountryCode + ' ' + formData.mobileNumber);
    setIsVerified(true);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const userData = {
        ...formData,
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.emailAddress,
        type: getUserRoleEnumValue(formData.userRole),
        status: getUserStatusEnumValue(formData.status),
        mobileNumber: selectedCountryCode + ' ' + formData.mobileNumber,
        phoneVerified: isVerified
      };

      const updatedUser = await updateUser(user.id, userData);
      
      if (onSave) {
        onSave(updatedUser);
      }
      
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format countries for dropdown
  const countryOptions = countries.map(country => ({
    value: country.id,
    label: `${country.name} ${country.code ? `(${country.code})` : ''}`
  }));

  // Format cities for dropdown
  const cityOptions = cities.map(city => ({
    value: city.id,
    label: city.name
  }));

  const footer = (
    <>
      <ActionButton
        variant="secondary"
        onClick={onClose}
        className="min-w-[110px] h-10"
        disabled={isSubmitting}
      >
        Cancel
      </ActionButton>
      <ActionButton
        variant="primary"
        onClick={handleSubmit}
        className="min-w-[110px] h-10"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </ActionButton>
    </>
  );

  const selectedCountry = countries.find(c => c.phoneCode === selectedCountryCode) || countries[0];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User Details"
      footer={footer}
      width="600px"
      height="auto"
    >
      <div className="space-y-6">
        {/* First Name and Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name*
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent"
              placeholder="Enter first name"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name*
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent"
              placeholder="Enter last name"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address*
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent"
            placeholder="Enter email address"
            disabled={isSubmitting}
          />
        </div>

        {/* Country and City Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country*
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white"
              disabled={isSubmitting}
            >
              <option value="">Select a country</option>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City*
            </label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white"
              disabled={!formData.country || isSubmitting}
            >
              <option value="">Select a city</option>
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number*
          </label>
          <div className="flex items-center gap-0 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#05CBE7] focus-within:border-transparent">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 h-10 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedCountry.phoneCode}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isDropdownOpen && !isSubmitting && (
                <div className="absolute top-full left-0 mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-32">
                  {countries.map((country) => (
                    <button
                      key={country.phoneCode}
                      type="button"
                      onClick={() => handleCountryCodeSelect(country)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{country.name} ({country.phoneCode})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              type="text"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              className="flex-1 px-3 h-10 border-0 focus:outline-none"
              placeholder="XX 12 345 6789"
              disabled={isSubmitting}
            />

            {/* Verify Button */}
            <div className="px-3">
              {isVerified ? (
                <div className="flex items-center gap-2 bg-success_50 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border-2 border-success">
                  <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-success">Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap hover:bg-blue-200 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <span>Verify</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* User Role and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Role*
            </label>
            <select
              value={formData.userRole}
              onChange={(e) => handleInputChange('userRole', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white"
              disabled={isSubmitting}
            >
              <option value="">Select a role</option>
              <option value="SuperAdmin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Marketing">Marketing</option>
              <option value="CustomerSupport">Customer Support</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status*
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white"
              disabled={isSubmitting}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleInputChange('birthdate', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default EditUserModal;