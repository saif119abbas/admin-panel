// src/components/settings/CircleButton.jsx
import React from 'react';

const CircleButton = ({ 
  icon,
  onClick,
  backgroundColor = 'bg-gray-100',
  borderColor = 'border-gray-200',
  iconColor = 'text-gray-600',
  size = 40,
  className = "",
  style = {},
  ...props 
}) => {
  const buttonClasses = `
    flex items-center justify-center 
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
    rounded-full border transition-all duration-200
    hover:opacity-80
    ${backgroundColor} ${borderColor} ${className}
  `;

  // Function to render icon with proper color handling
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      // For image icons
      return (
        <img 
          src={icon} 
          alt="icon" 
          className="w-5 h-5"
        />
      );
    } else {
      // For React element icons (like Lucide icons)
      return React.cloneElement(icon, { 
        className: `w-5 h-5 ${iconColor}`,
      });
    }
  };

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};

export default CircleButton;