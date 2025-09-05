import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const InputField = ({ 
  label,
  placeholder = "Enter",
  value = "",
  onChange,
  type = "text",
  required = false,
  className = "",
  inputClassName = "",
  error,
  disabled = false,
  ...props 
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label 
          className="mb-2 text-sm font-medium text-black"
          style={AppFonts.mdSemiBold({ color: AppColors.black })}
        >
          {label}
          {required }
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full h-12 px-4 py-3 
          bg-white 
          border rounded-lg 
          outline-none 
          transition-all 
          duration-200
          text-black
          placeholder:text-gray-500
          focus:ring-1
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-200 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500'
          }
          ${inputClassName}
        `}
        style={{
          ...AppFonts.mdRegular({ color: AppColors.black })
        }}
        {...props}
      />
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

export default InputField;