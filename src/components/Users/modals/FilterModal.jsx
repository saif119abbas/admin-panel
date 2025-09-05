// src/components/Users/modals/FilterModal.jsx
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ActionButton from '../common/ActionButton';

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    country: currentFilters.country || '',
    city: currentFilters.city || '',
    createdOn: currentFilters.createdOn || '',
    status: currentFilters.status || ''
  });

  const countries = [
    'All Countries',
    'Georgia', 
    'Haiti', 
    'Palestine, State of', 
    'Central African Republic',
    'Curaçao',
    'Saint Vincent and the Grenadines',
    'Brazil',
    'Guinea',
    'Poland',
    'South Africa',
    'Åland Islands',
    'Bahrain'
  ];

  const cities = [
    'All Cities',
    'Atlanta',
    'Port-au-Prince',
    'Ramallah',
    'Bangui',
    'Willemstad',
    'Kingstown',
    'São Paulo',
    'Conakry',
    'Warsaw',
    'Cape Town',
    'Mariehamn',
    'Manama'
  ];

  const createdOnOptions = [
    'All Dates',
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'Last 3 months',
    'Last 6 months',
    'Last year'
  ];

  const statusOptions = [
    'All Status',
    'Active',
    'Pending'
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleCancel = () => {
    setFilters({
      country: '',
      city: '',
      createdOn: '',
      status: ''
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Modal full height */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="pt-5 px-4 pb-0">
          <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        </div>

        {/* Filter Options */}
        <div className="flex-1 p-4 pt-2 space-y-6 overflow-y-auto">
          {/* Country Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Created On Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created On
            </label>
            <div className="relative">
              <select
                value={filters.createdOn}
                onChange={(e) => handleFilterChange('createdOn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {createdOnOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Footer Buttons - Updated to use ActionButton */}
          <div className="mt-6 flex space-x-3">
            <ActionButton
              variant="secondary"
              onClick={handleCancel}
              fullWidth
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleApply}
              fullWidth
            >
              Submit
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;