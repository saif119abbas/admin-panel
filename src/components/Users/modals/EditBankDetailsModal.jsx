// src/components/Users/modals/EditBankDetailsModal.jsx
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';
import lookupService from '../../../services/lookupService';
import { useUser } from '../../../context/UserContext';

const EditBankDetailsModal = ({ isOpen, onClose, onSave, bankData }) => {
  const [formData, setFormData] = useState({
    bankName: bankData.bankName || 'Emirates NBD',
    accountHolderName: bankData.accountHolderName || '',
    countryId: bankData.countryId || '',
    IBAN: bankData.IBAN || ''
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await lookupService.getCountries();
        setCountries(countryData || []);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log('Updated bank details:', formData);
    const data = {
      id: bankData.id,
      accountHolderName: formData.accountHolderName,
      IBAN: formData.IBAN,
      bankName: formData.bankName,
      countryId: formData.countryId,
    };
    await onSave(data);
    onClose();
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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Bank Details"
      footer={footer}
      width="500px"
      height="520px"
    >
      <div className="space-y-4">
        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Bank Name*
          </label>
          <div className="relative">
            <select
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7] appearance-none"
            >
              <option value="Emirates NBD">Emirates NBD</option>
              <option value="ADCB">Abu Dhabi Commercial Bank</option>
              <option value="FAB">First Abu Dhabi Bank</option>
              <option value="ADIB">Abu Dhabi Islamic Bank</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Account Holder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Account Holder Name*
          </label>
          <input
            type="text"
            value={formData.accountHolderName}
            onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7]"
            placeholder="Enter account holder name"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Country*
          </label>
          <div className="relative">
            <select
              value={formData.countryId}
              onChange={(e) => handleInputChange('countryId', e.target.value)}
              className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7] appearance-none"
            >
              <option value="" disabled>Select a country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* IBAN */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            IBAN*
          </label>
          <input
            type="text"
            value={formData.IBAN}
            onChange={(e) => handleInputChange('IBAN', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7]"
            placeholder="Enter IBAN"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default EditBankDetailsModal;