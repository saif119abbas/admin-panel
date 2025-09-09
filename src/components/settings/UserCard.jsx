// src/components/settings/UserCard.jsx
import React from 'react';
import { Pencil , Trash2 } from 'lucide-react';
import CircleButton from './CircleButton.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const UserCard = ({ 
  name,
  country,
  email,
  phone,
  photo,
  role, 
  isActive,
  onEdit,
  onDelete,
  isRoot,
  isLast = false,
  id,
  className = ""
}) => {
  const getroleColor = (role) => {
    const roleLower = role?.toLowerCase() || '';
    if (roleLower.includes('super admin')) return AppColors.primary;
    if (roleLower.includes('admin')) return AppColors.info_500;
    if (roleLower.includes('marketing')) return AppColors.orange_600;
    if (roleLower.includes('customer support')) return AppColors.gray_800;
    return AppColors.primary;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div 
      className={`
        bg-white 
        p-4 
        min-h-30
        flex items-center 
        ${!isLast ? 'border-b' : ''}
        border-gray-200
        ${className}
      `}
      style={{
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none'
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="
            flex-shrink-0 
            bg-gray-300 
            w-28 h-28 
            rounded-full
            flex items-center justify-center 
            overflow-hidden
            mx-auto sm:mx-0
          ">
            {photo ? (
              <img 
                src={photo} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span 
                className="text-white font-bold text-xl"
                style={AppFonts.xlBold({ color: AppColors.white })}
              >
                {getInitials(name)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            {/* Name */}
            <h3 
              className="text-black font-bold truncate"
              style={AppFonts.mdBold({ color: AppColors.black })}
            >
              {name}
            </h3>

            {/* Location, email, phone group */}
            <div className="mt-1.5 space-y-0">
              <p 
                className="text-gray-600 text-sm truncate"
                style={AppFonts.smMedium({ color: AppColors.gray_600 })}
              >
                {country}
              </p>
              <p 
                className="text-gray-600 text-sm truncate"
                style={AppFonts.smMedium({ color: AppColors.gray_600 })}
              >
                {email}
              </p>
              <p 
                className="text-gray-600 text-sm truncate"
                style={AppFonts.smMedium({ color: AppColors.gray_600 })}
              >
                {phone}
              </p>
            </div>

            {/* Role role Badge */}
            <div className="mt-1.5">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-white inline-block"
                style={{
                  backgroundColor: getroleColor(role),
                  ...AppFonts.h6({ color: AppColors.white })
                }}
              >
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons and active role */}
        <div className="flex flex-col items-center sm:items-end justify-center space-y-3 flex-shrink-0">
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <CircleButton
              icon={<Pencil className="w-5 h-5" />}
              onClick={onEdit}
              backgroundColor="white"
              borderColor={AppColors.primary_500}
              iconColor={AppColors.primary_500}
              size={40}
              disabled={isRoot}
            />
            <CircleButton
              icon={<Trash2 className="w-5 h-5" />}
              onClick={onDelete}
              backgroundColor="white"
              borderColor={AppColors.danger_500}
              iconColor={AppColors.danger_500}
              size={40}
              disabled={isRoot}
            />
          </div>

          {/* Active/Inactive role indicator */}
          <div className="flex items-center space-x-2">
            <span 
              className={`text-sm font-medium ${isActive ? 'text-green-500' : 'text-red-500'}`}
              style={AppFonts.h5({ 
                color: isActive ? AppColors.success_500 : AppColors.danger 
              })}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;