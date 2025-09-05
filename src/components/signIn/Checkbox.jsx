import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const Checkbox = ({ 
  id,
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed"
        style={{
          accentColor: AppColors.secondary,
          borderColor: AppColors.border_3,
          focusRingColor: AppColors.info_500,
        }}
        {...props}
      />
      {label && (
        <label 
          htmlFor={id} 
          className="ml-2 cursor-pointer select-none"
          style={AppFonts.mdSemiBold({ color: AppColors.text })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;