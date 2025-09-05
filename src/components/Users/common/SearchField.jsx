// src/components/Users/common/SearchField.jsx
import { Search } from 'lucide-react';

const SearchField = ({
  searchTerm = '',
  onSearchChange,
  placeholder = 'Search',
  className = '',
  width = 'w-[259px]',
  height = 'h-[38px]',
  ...props
}) => {
  return (
    <div className={`relative ${width} ${height} ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full h-full pl-3 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        {...props}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );
};

export default SearchField;