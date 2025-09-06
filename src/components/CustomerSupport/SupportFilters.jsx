//src/components/CustomerSupport/SupportFilters.jsx
import { Search, Filter } from 'lucide-react';
import CustomFilterIcon from '../../assets/icons/CustomFilterIcon';
import ActionButton from '../Users/common/ActionButton';
import SearchField from '../Users/common/SearchField';

const SupportFilters = ({ 
  statusFilter, 
  onStatusFilterChange, 
  searchTerm, 
  onSearchChange,
  selectAll,
  selectCurrentPage,
  onSelectAll,
  onSelectCurrentPage,
  onOpenFilter
}) => {
  return (
    <div className="bg-white rounded-lg p-2 w-full max-w-[1360px] h-15 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Selection checkboxes */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="select-all-tickets"
              checked={selectAll}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 text-indigo-600 bg-gray-100 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label htmlFor="select-all-tickets" className="ml-2 text-md font-medium text-gray-700">
              Select All
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="select-current-page-tickets"
              checked={selectCurrentPage}
              onChange={(e) => onSelectCurrentPage(e.target.checked)}
              className="w-4 h-4 text-indigo-600 bg-gray-100 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label htmlFor="select-current-page-tickets" className="ml-2 text-md font-medium text-gray-700">
              Select Current Page
            </label>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <SearchField
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search"
            width="w-[259px]"
            height="h-[38px]"
          />
          
          {/* Filter Button */}
          <ActionButton 
            variant="outline"
            icon={CustomFilterIcon}
            onClick={onOpenFilter}
            className="!w-[107px] !h-[40px] hover:!bg-blue-50 hover:!text-primary"
          >
            Filter
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default SupportFilters;