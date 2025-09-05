import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const SelectField = ({ 
  label,
  placeholder = "Select",
  value = "",
  onChange,
  options = [],
  required = false,
  className = "",
  error,
  disabled = false,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value) || null;

  return (
    <div className={`relative flex flex-col ${className}`}>
      {label && (
        <label 
          className="mb-2 text-sm font-medium text-black"
          style={AppFonts.smMedium({ color: AppColors.black })}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full h-12 px-4 py-3
            flex items-center justify-between
            bg-white
            border rounded-lg
            outline-none
            transition-all
            duration-200
            text-left
            focus:ring-1
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-200 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'
            }
          `}
          style={{
            ...AppFonts.mdRegular({ 
              color: selectedOption ? AppColors.black : AppColors.gray_500 
            })
          }}
          {...props}
        >
          <span>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && !disabled && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Options Container */}
            <div className="
              absolute top-full left-0 w-full mt-1 z-20
              max-h-60 overflow-auto
              bg-white border border-gray-300 rounded-lg shadow-lg
            ">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full text-left px-4 py-3
                    hover:bg-gray-50 
                    transition-colors
                    ${index < options.length - 1 ? 'border-b border-gray-100' : ''}
                  `}
                  style={{
                    ...AppFonts.mdRegular({ color: AppColors.black })
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {error && (
        <span 
          className="mt-1 text-sm text-red-500"
          style={{ color: AppColors.danger }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default SelectField;