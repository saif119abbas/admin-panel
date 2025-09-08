//src\components\settings\UserRoles.jsx
import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const UserRoles = (
  { 
  label = "User Roles",
  selectedRole = 0,
  onChange,
  required = false,
  className = "",
  error,
  disabled = false 
}) => {
  const roles = [
    {
      id: 0,
      name: 'Super Admin'
    },
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Marketing'
    },
    {
      id: 3,
      name: 'Customer Support'
    }
  ];

  const handleRoleSelect = (roleId) => {
    if (!disabled && onChange) {
      onChange(roleId);
    }
  };

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
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleRoleSelect(role.id)}
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
                ${isSelected
                  ? 'text-white border-indigo-700'
                  : 'text-black bg-gray-200 border-gray-300 hover:bg-gray-300'
                }
              `}
              style={{
                backgroundColor: isSelected ? AppColors.secondary : '#F4F8FB', 
                borderColor: isSelected ? AppColors.secondary : '#F0F0F0',
                
              }}
            >
              <span 
                className="font-semibold flex-1 text-left"
                style={AppFonts.mdSemiBold({ 
                  color: isSelected ? AppColors.white : AppColors.text 
                })}
              >
                {role.name}
              </span>

              <div 
                className="
                  w-5 h-5 rounded-full 
                  border-2 
                  flex items-center justify-center
                  flex-shrink-0
                "
                style={{
                  borderColor: isSelected ? AppColors.primary  :'#F0F0F0' ,
                  backgroundColor: 'transparent'
                }}
              >
                {isSelected && (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: AppColors.primary }}
                  />
                )}
              </div>
            </button>
          );
        })}
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