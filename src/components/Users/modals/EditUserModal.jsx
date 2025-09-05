// src/components/Users/modals/EditUserModal.jsx
import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    countryCode: '+971',
    phoneNumber: '',
    status: 'Active'
  });

  const [isVerified, setIsVerified] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countryCodes = [
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
    { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'UK' }
  ];

  useEffect(() => {
    if (user && isOpen) {
      const nameParts = user.name ? user.name.split(' ') : ['', ''];
      const fullPhoneNumber = user.phoneNumber || '+971 12 345 6789';
      const phoneMatch = fullPhoneNumber.match(/^(\+\d{1,4})\s(.+)$/);
      
      setFormData({
        firstName: nameParts[0] || '',
        surname: nameParts.slice(1).join(' ') || '',
        countryCode: phoneMatch ? phoneMatch[1] : '+971',
        phoneNumber: phoneMatch ? phoneMatch[2] : '12 345 6789',
        status: user.status || 'Active'
      });
      
      setIsVerified(user.phoneVerified !== false);
    }
  }, [user, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'phoneNumber' || field === 'countryCode') {
      setIsVerified(false);
    }
  };

  const handleCountryCodeSelect = (countryCode) => {
    handleInputChange('countryCode', countryCode);
    setIsDropdownOpen(false);
  };

  const handleVerifyPhone = () => {
    console.log('Verifying phone:', formData.countryCode + ' ' + formData.phoneNumber);
    setIsVerified(true);
  };

  const handleSubmit = async () => {
    try {
      const updateData = {
        firstName: formData.firstName,
        surname: formData.surname,
        phoneNumber: formData.countryCode + ' ' + formData.phoneNumber,
        status: formData.status,
        phoneVerified: isVerified
      };

      console.log('Updating user data:', updateData);

      const updatedUserData = {
        ...user,
        name: `${formData.firstName} ${formData.surname}`,
        phoneNumber: formData.countryCode + ' ' + formData.phoneNumber,
        status: formData.status,
        phoneVerified: isVerified
      };

      onSave(updatedUserData);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const footer = (
    <>
      <ActionButton
        variant="secondary"
        onClick={onClose}
        className="min-w-[110px] h-10"
      >
        Cancel
      </ActionButton>
      <ActionButton
        variant="primary"
        onClick={handleSubmit}
        className="min-w-[110px] h-10"
      >
        Update
      </ActionButton>
    </>
  );

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User Details"
      footer={footer}
      width="500px"
      height="436px"
    >
      <div className="space-y-6">
        {/* First Name and Surname Row */}
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
              placeholder="Barbara"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surname*
            </label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => handleInputChange('surname', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent"
              placeholder="Gordon"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="flex items-center gap-0 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#05CBE7] focus-within:border-transparent">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 h-10 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-32">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountryCodeSelect(country.code)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="flex-1 px-3 h-10 border-0 focus:outline-none"
              placeholder="XX 12 345 6789"
            />

            {/* Verify Button */}
            <div className="px-3">
              {isVerified ? (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border-2 border-green-500">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-green-700">Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap hover:bg-blue-200 transition-colors"
                >
                  <span>Verify</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status*
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white"
          >
            <option value="Active">Active</option>
            <option value="Pedning">Pedning</option>
          </select>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditUserModal;