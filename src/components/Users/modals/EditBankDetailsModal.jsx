// src/components/Users/modals/EditBankDetailsModal.jsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';

const EditBankDetailsModal = ({ isOpen, onClose,onSave, bankData  }) => {
  const [formData, setFormData] = useState({
    bankName: bankData.bankName || 'Emirates NBD',
    accountHolder: bankData.accountHolder || 'Barbara Gordon',
    country: bankData.country || 'United Arab Emirates',
    iban: bankData.iban || 'AE070331234567890126543'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit =async  () => {
    console.log('Updated bank details:', formData);
    const data={
      id:bankData.id,
      accountHolderName:formData.accountHolder,
      IBAN:bankData.IBAN,
      bankName:formData.bankName,
      countryId:formData.country
    }
    await onSave(data)
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
            value={formData.accountHolder}
            onChange={(e) => handleInputChange('accountHolder', e.target.value)}
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
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7] appearance-none"
            >
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Qatar">Qatar</option>
              <option value="Oman">Oman</option>
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
            value={formData.iban}
            onChange={(e) => handleInputChange('iban', e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7]"
            placeholder="Enter IBAN"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default EditBankDetailsModal;