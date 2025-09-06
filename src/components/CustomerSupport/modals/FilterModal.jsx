// src/components/CustomerSupport/modals/FilterModal.jsx
import { ChevronDown, Calendar } from 'lucide-react';
import { useState } from 'react';
import ActionButton from '../../Users/common/ActionButton';

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    ticketId: currentFilters.ticketId || '',
    subject: currentFilters.subject || '',
    user: currentFilters.user || '',
    createdOn: currentFilters.createdOn || '',
    status: currentFilters.status || ''
  });

  // Filter options based on the mock data structure
  const subjectOptions = [
    'All Subject/Type',
    'Technical',
    'Account',
    'Payment', 
    'Financial',
    'Safety'
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
    'Pending',
    'In-progress',
    'Resolved'
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
      ticketId: '',
      subject: '',
      user: '',
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
          {/* Ticket ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket ID
            </label>
            <input
              type="text"
              value={filters.ticketId}
              onChange={(e) => handleFilterChange('ticketId', e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Ticket Subject/Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Subject/Type
            </label>
            <div className="relative">
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User
            </label>
            <input
              type="text"
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
              placeholder="Enter Username / Email / User ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Created On Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created On
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.createdOn}
                onChange={(e) => handleFilterChange('createdOn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                placeholder="Select Date"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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

          {/* Footer Buttons */}
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