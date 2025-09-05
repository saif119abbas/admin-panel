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
  const getBackgroundClass = () => {
    if (backgroundColor === 'white') return 'bg-white';
    if (backgroundColor.startsWith('#') || backgroundColor.startsWith('rgb')) {
      return '';
    }
    return backgroundColor.startsWith('bg-') ? backgroundColor : `bg-${backgroundColor}`;
  };

  const getBorderClass = () => {
    if (borderColor.startsWith('#') || borderColor.startsWith('rgb')) {
      return 'border';
    }
    return borderColor.startsWith('border-') ? borderColor : `border-${borderColor}`;
  };

  const buttonClasses = `
    flex items-center justify-center 
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
    rounded-full border transition-all duration-200
    hover:opacity-80
    ${getBackgroundClass()} ${getBorderClass()} ${className}
  `;

  const customStyles = {
    ...style
  };

  if (backgroundColor.startsWith('#') || backgroundColor.startsWith('rgb')) {
    customStyles.backgroundColor = backgroundColor;
  }

  if (borderColor.startsWith('#') || borderColor.startsWith('rgb')) {
    customStyles.borderColor = borderColor;
  }

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <img 
          src={icon} 
          alt="icon" 
          className="w-5 h-5"
        />
      );
    } else {
      const iconStyle = {};
      if (iconColor.startsWith('#') || iconColor.startsWith('rgb')) {
        iconStyle.color = iconColor;
      }

      return React.cloneElement(icon, { 
        className: `w-5 h-5 ${iconColor.startsWith('#') || iconColor.startsWith('rgb') ? '' : iconColor}`,
        style: iconStyle
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
        ...customStyles
      }}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};

export default CircleButton;