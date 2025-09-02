//src\components\signIn\InputField.jsx
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
      className={`px-3 py-4 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${className}`}
      style={{
        width: '100%',
        maxWidth: '402px',
        height: '50px',
        border: `1px solid ${AppColors.border_3}`,
        borderRadius: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        ...AppFonts.mdMedium({ color: AppColors.text }),
        focusRingColor: AppColors.info_500,
      }}
      {...props}
    />
  );
};

export default InputField;