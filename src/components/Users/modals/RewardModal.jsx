// src/components/Users/modals/RewardModal.jsx
import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import ActionButton from '../common/ActionButton';
import BaseModal from '../common/BaseModal';
import { useModalManager } from '../../Users/hooks/useModalManager';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName = 'Barbara Gordon',
  zIndex = 60
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  const customHeader = (
    <div className="flex items-center gap-2">
      <AlertCircle className="w-5 h-5 text-orange-500" />
      <h2 className="text-lg font-semibold text-gray-900">Alert!</h2>
    </div>
  );

  const footer = (
    <>
      <ActionButton
        type="button"
        variant="secondary"
        onClick={handleCancel}
        className="!bg-transparent !text-gray-300 !border-gray-500 hover:!bg-gray-700 hover:!text-white min-w-[80px] h-9"
      >
        Cancel
      </ActionButton>
      <ActionButton
        type="button"
        variant="primary"
        onClick={handleConfirm}
        className="min-w-[60px] h-9"
      >
        Yes
      </ActionButton>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      customHeader={customHeader}
      footer={footer}
      width="500px"
      zIndex={zIndex}
    >
      <p className="text-gray-700 text-sm">
        Are you sure you would like to Reward {userName}?
      </p>
    </BaseModal>
  );
};

const RewardModal = ({ isOpen, onClose, user }) => {
  // use hook to manage the status of modals
  const {
    isConfirmationModalOpen,
    openConfirmationModal,
    handleConfirm,
    handleCancelConfirmation
  } = useModalManager();

  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [selectedCurrency, setSelectedCurrency] = useState('AED');
  const [rewardAmount, setRewardAmount] = useState('120');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const countries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Kuwait',
    'Qatar',
    'Bahrain',
    'Oman'
  ];

  const currencies = ['AED', 'SAR', 'KWD', 'QAR', 'BHD', 'OMR'];

  const handleSubmit = (e) => {
    e.preventDefault();
    openConfirmationModal();
  };

  const handleConfirmReward = () => {
    console.log('Reward confirmed and submitted:', {
      user: user?.name || 'Barbara Gordon',
      country: selectedCountry,
      currency: selectedCurrency,
      amount: rewardAmount
    });
    onClose();
  };

  const handleOverlayClick = () => {
    if (isCountryDropdownOpen) setIsCountryDropdownOpen(false);
    if (isCurrencyDropdownOpen) setIsCurrencyDropdownOpen(false);
  };

  const footer = (
    <div className="bg-dark_bg px-6 py-4 flex items-center justify-end space-x-3 rounded-b-lg -mx-6 -mb-6 mt-6">
      <ActionButton
        type="button"
        variant="secondary"
        onClick={onClose}
        className="min-w-[110px] h-10"
      >
        Cancel
      </ActionButton>
      <ActionButton
        type="submit"
        variant="primary"
        className="min-w-[110px] h-10"
      >
        Submit
      </ActionButton>
    </div>
  );

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Reward"
        footer={null}
        width="500px"
        height="auto"
        zIndex={50}
        overlayClickClose={false}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full" onClick={handleOverlayClick}>
          <div className="space-y-6 flex-1">
            {/* Country Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCountryDropdownOpen(!isCountryDropdownOpen);
                    setIsCurrencyDropdownOpen(false);
                  }}
                  className="w-full h-10 px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7] flex items-center justify-between"
                >
                  <span className="text-gray-700">{selectedCountry}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {isCountryDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCountry(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-700"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Currency and Reward Amount Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                      setIsCountryDropdownOpen(false);
                    }}
                    className="w-full h-10 px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7] flex items-center justify-between"
                  >
                    <span className="text-gray-700">{selectedCurrency}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {isCurrencyDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCurrency(currency);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-700"
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Reward Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reward Amount<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#05CBE7] focus:border-[#05CBE7]"
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>
          
          {footer}
        </form>
      </BaseModal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelConfirmation}
        onConfirm={() => handleConfirm(handleConfirmReward)}
        userName={user?.name || 'Barbara Gordon'}
        zIndex={60}
      />
    </>
  );
};

export default RewardModal;