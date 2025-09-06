//src\components\settings\StatsCard.jsx
import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const StatsCard = ({ 
  title,
  value,
  icon,
  iconBackgroundColor = AppColors.primary,
  className = ""
}) => {
  return (
    <div 
      className={`
        bg-white 
        border border-gray-200 
        rounded-lg 
        p-4 
        h-21
        flex items-center 
        ${className}
      `}
    >
      <div className="flex items-center justify-between w-full">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p 
            className="text-2xl font-bold text-black truncate"
            style={AppFonts.h3({ color: AppColors.black })}
          >
            {value}
          </p>
          <p 
            className="text-gray-600 truncate"
            style={AppFonts.smMedium({ color: AppColors.text })}
          >
            {title}
          </p>
        </div>

        <div 
          className="
            w-12 h-12 
            rounded-full 
            flex items-center justify-center 
            flex-shrink-0 
            ml-4
          "
          style={{
            backgroundColor: iconBackgroundColor
          }}
        >
          {typeof icon === 'string' ? (
            <img 
              src={icon} 
              alt="stat icon" 
              className="w-6 h-6"
            />
          ) : (
            React.cloneElement(icon, { className: 'w-6 h-6 text-white' })
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;