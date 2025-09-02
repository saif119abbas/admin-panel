import React from 'react';

const InputField = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  label,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: '#000', textAlign: 'left' }}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-3 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${className}`}
        style={{
          width: '100%',
          maxWidth: '402px',
          height: '50px',
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          fontSize: '16px',
          '::placeholder': {
            color: '#E5E5E5'
          }
        }}
        {...props}
      />
    </div>
  );
};

export default InputField;