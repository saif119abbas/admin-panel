import { ChevronDown, Calendar } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ActionButton from '../Users/common/ActionButton';

const FilterModal = ({ isOpen, onClose, onApplyFilters, onFilterChange, currentFilters, filterConfig = [] }) => {

  const getInitialState = useCallback(() => {
    const initialState = {};
    filterConfig.forEach(filter => {
      initialState[filter.key] = currentFilters?.[filter.key] || '';
    });
    return initialState;
  }, [filterConfig, currentFilters]);

  const [filters, setFilters] = useState(getInitialState);

  useEffect(() => {
    if (isOpen) {
      setFilters(getInitialState());
    }
  }, [isOpen, getInitialState]);

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetAndClose = () => {
    const emptyFilters = {};
    filterConfig.forEach(filter => {
      emptyFilters[filter.key] = '';
    });
    onApplyFilters(emptyFilters); // Apply empty filters to reset view
    onClose();
  };

  const renderFilterInput = (filter) => {
    switch (filter.type) {
      case 'text':
        return (
          <input
            type="text"
            value={filters[filter.key] || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            placeholder={filter.placeholder || 'Enter value'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        );
      case 'dropdown':
        return (
          <div className="relative">
            <select
              value={filters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              disabled={filter.disabled}
            >
              <option value="">{filter.placeholder || 'Select'}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        );
      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              value={filters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
              placeholder={filter.placeholder || 'Select Date'}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        );
      default:
        return null;
    }
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
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="pt-5 px-4 pb-0">
          <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        </div>

        {/* Filter Options */}
        <div className="flex-1 p-4 pt-2 space-y-6 overflow-y-auto">
          {filterConfig.map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              {renderFilterInput(filter)}
            </div>
          ))}

          {/* Footer Buttons */}
          <div className="mt-6 flex space-x-3">
            <ActionButton
              variant="secondary"
              onClick={handleResetAndClose}
              fullWidth
            >
              Reset
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleApply}
              fullWidth
            >
              Apply
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;