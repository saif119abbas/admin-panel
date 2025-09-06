//src\components\settings\UserRoles.jsx
import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const UserRoles = ({ 
  label = "User Roles",
  selectedRole = "",
  onChange,
  required = false,
  className = "",
  error,
  disabled = false 
}) => {
  // SystemUserType enum mapping
  const userRoles = [
    { value: 0, label: 'Super Admin', description: 'Full system access' },
    { value: 1, label: 'Admin', description: 'Administrative access' },
    { value: 2, label: 'Marketing', description: 'Marketing operations' },
    { value: 3, label: 'Customer Support', description: 'Customer service' }
  ];

  const handleRoleSelect = (roleValue) => {
    if (!disabled && onChange) {
      onChange(roleValue); // Pass the int value (0, 1, 2, 3)
    }
  };

  // Convert selectedRole to int for comparison
  const selectedRoleInt = parseInt(selectedRole);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label 
          className="mb-4 text-sm font-medium text-black"
          style={AppFonts.smMedium({ color: AppColors.black })}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {userRoles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => handleRoleSelect(role.value)}
            disabled={disabled}
            className={`
              relative 
              flex items-center justify-center 
              p-4 rounded-lg 
              min-h-14
              transition-all duration-200 
              outline-none 
              border-2
              focus:ring-2 focus:ring-offset-2
              ${disabled 
                ? 'cursor-not-allowed opacity-50' 
                : 'cursor-pointer'
              }
              ${selectedRoleInt === role.value
                ? 'text-white border-indigo-700'
                : 'text-black bg-gray-200 border-gray-300 hover:bg-gray-300'
              }
            `}
            style={{
              backgroundColor: selectedRoleInt === role.value ? AppColors.secondary : '#F4F8FB', 
              borderColor: selectedRoleInt === role.value ? AppColors.secondary : '#F0F0F0',
            }}
          >
            <span 
              className="font-semibold flex-1 text-left"
              style={AppFonts.mdSemiBold({ 
                color: selectedRoleInt === role.value ? AppColors.white : AppColors.text 
              })}
            >
              {role.label}
            </span>

            <div 
              className="
                w-5 h-5 rounded-full 
                border-2 
                flex items-center justify-center
                flex-shrink-0
              "
              style={{
                borderColor: selectedRoleInt === role.value ? AppColors.primary  :'#F0F0F0' ,
                backgroundColor: 'transparent'
              }}
            >
              {selectedRoleInt === role.value && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: AppColors.primary }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <span 
          className="mt-2 text-sm text-red-500"
          style={{ color: AppColors.danger }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default UserRoles;