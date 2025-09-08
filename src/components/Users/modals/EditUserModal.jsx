// src/components/Users/modals/EditUserModal.jsx
import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';
import lookupService from '../../../services/lookupService';

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    status: '',
  });
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCodeOptions, setCountryCodeOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchCountryCodes = async () => {
        try {
          const countryData = await lookupService.getCountries();
          if (countryData && Array.isArray(countryData)) {
            const codeOptions = countryData.map(c => ({ code: c.phoneCode, flag: c.flag, name: c.name }));
            setCountryCodeOptions(codeOptions);
          }
        } catch (error) {
          console.error("Failed to fetch country codes:", error);
        }
      };
      fetchCountryCodes();
    }
  }, [isOpen]);

  useEffect(() => {
    if (user && isOpen && countryCodeOptions.length > 0) {
      const sortedCodes = [...countryCodeOptions].sort((a, b) => (b.code?.length || 0) - (a.code?.length || 0));
      const matchedCode = sortedCodes.find(c => c.code && user.mobileNumber?.startsWith("+" + c.code));

      setFormData({
        firstName: user.firstName || '',
        surName: user.surName || '',
        status: user.isPending ? 'Pending' : 'Active',
      });

      if (matchedCode) {
        setCountryCode(matchedCode.code);
        setPhoneNumber(user.mobileNumber.substring(matchedCode.code.length + 1).trim());
      } else {
        const defaultCode = countryCodeOptions.find(c => c.name === 'Saudi Arabia')?.code || countryCodeOptions[0]?.code || '';
        setCountryCode(defaultCode);
        setPhoneNumber(user.mobileNumber || '');
      }
    }
  }, [user, isOpen, countryCodeOptions]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryCodeSelect = (code) => {
    setCountryCode(code);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    const dataToSave = {
      id: user.id,
      firstName: formData.firstName,
      lastName: formData.surName,
      mobileNumber: `+${countryCode}${phoneNumber}`,
      isPending: formData.status === 'Pending',
    };
    await onSave(dataToSave);
    onClose();
  };

  const footer = (
    <>
      <ActionButton variant="secondary" onClick={onClose} className="min-w-[110px] h-10">Cancel</ActionButton>
      <ActionButton variant="primary" onClick={handleSubmit} className="min-w-[110px] h-10">Update</ActionButton>
    </>
  );

  const selectedCountry = countryCodeOptions.find(c => c.code === countryCode) || countryCodeOptions[0];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit User Details" footer={footer} width="500px" height="436px">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
            <input type="text" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent" placeholder="Barbara" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Surname*</label>
            <input type="text" value={formData.surName} onChange={(e) => handleInputChange('surName', e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent" placeholder="Gordon" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex items-center gap-0 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#05CBE7] focus-within:border-transparent">
            <div className="relative">
              <button disabled={true} type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 px-3 h-10 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors">
                <span className="text-lg">{selectedCountry?.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedCountry?.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-32">
                  {countryCodeOptions.map((country, index) => (
                    <button key={`${country.code}-${index}`} type="button" onClick={() => handleCountryCodeSelect(country.code)} className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input disabled={true} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="flex-1 px-3 h-10 border-0 focus:outline-none" placeholder="XX 12 345 6789" />
            <div className="px-3">
              <div className="flex items-center gap-2 bg-success_50 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border-2 border-success">
                <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-success">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status*</label>
          <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-transparent bg-white">
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditUserModal;