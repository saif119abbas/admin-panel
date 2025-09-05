import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import searchIcon from '../../assets/icons/trash.svg';

const SearchField = ({ 
  placeholder = "Search",
  value = "",
  onChange,
  className = "",
  ...props 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="
        w-64 h-10 
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
          className="
            flex-1 
            outline-none 
            bg-transparent 
            text-black
            placeholder:text-gray-500
          "
          style={{
            ...AppFonts.mdRegular({ color: AppColors.black })
          }}
          {...props}
        />
        <img 
          src={searchIcon} 
          alt="search" 
          className="w-4 h-4 ml-3 flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default SearchField;