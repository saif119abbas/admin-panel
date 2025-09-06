// src/components/CustomerSupport/modals/HistoryFilterModal.jsx
import { ChevronDown, Calendar } from 'lucide-react';
import { useState } from 'react';
import ActionButton from '../../Users/common/ActionButton';

const HistoryFilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    ticketId: currentFilters.ticketId || '',
    user: currentFilters.user || '',
    issueType: currentFilters.issueType || '',
    createdOn: currentFilters.createdOn || '',
    resolvedOn: currentFilters.resolvedOn || '',
    status: currentFilters.status || ''
  });

  // Filter options based on the History view data structure
  const issueTypeOptions = [
    'All Issue Types',
    'Tip Issue',
    'Bug Report',
    'Account Issue',
    'Payment Issue',
    'Technical Issue'
  ];

  const statusOptions = [
    'All Status',
    'Resolved',
    'Closed'
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
      user: '',
      issueType: '',
      createdOn: '',
      resolvedOn: '',
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
              placeholder="Enter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
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

          {/* Issue Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type
            </label>
            <div className="relative">
              <select
                value={filters.issueType}
                onChange={(e) => handleFilterChange('issueType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {issueTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
              <input
                type="date"
                value={filters.createdOn}
                onChange={(e) => handleFilterChange('createdOn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                placeholder="Select"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Resolved On Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resolved On
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.resolvedOn}
                onChange={(e) => handleFilterChange('resolvedOn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                placeholder="Select"
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

export default HistoryFilterModal;