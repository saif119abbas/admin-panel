import React from 'react';

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
        className="w-4 h-4 rounded border-2 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          accentColor: '#3623B7',
        }}
        {...props}
      />
      {label && (
        <label 
          htmlFor={id} 
          className="ml-2 text-sm cursor-pointer select-none"
          style={{ color: '#666666' }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;