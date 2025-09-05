import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const InputField = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full 
        max-w-md 
        h-12 
        px-3 
        py-4 
        rounded-lg 
        border 
        focus:outline-none 
        focus:ring-2 
        focus:border-transparent
        placeholder-gray-300
        ${className}
      `}
      style={{
        borderColor: AppColors.border_3,
        ...AppFonts.mdMedium({ color: AppColors.text }),
        focusRingColor: AppColors.info_500,
      }}
      {...props}
    />
  );
};

export default InputField;