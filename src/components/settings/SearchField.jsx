// src/components/settings/SearchField.jsx
import React from 'react';
import { Search } from 'lucide-react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const SearchField = ({ 
  placeholder = "Search",
  value = "",
  onChange,
  className = "",
  disabled = false,
  ...props 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="
        w-full sm:w-96 h-10 
        px-3 py-2.5
        flex items-center 
        bg-white 
        border border-gray-200 
        rounded-lg
        focus-within:border-blue-500 
        focus-within:ring-1 
        focus-within:ring-blue-500 
        transition-colors
      ">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            flex-1 
            outline-none 
            bg-transparent 
            text-black
            placeholder:text-gray-500
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          style={{
            ...AppFonts.mdRegular({ color: AppColors.black })
          }}
          {...props}
        />

        <Search className="w-4 h-4 ml-3 flex-shrink-0 text-gray-400" />
      </div>

      {value && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500">
          Searching for: "{value}"
        </div>
      )}
    </div>
  );
};

export default SearchField;