import React from 'react';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const Button = ({ 
  children,
  onClick,
  type = 'button',
  backgroundColor = AppColors.primary,
  borderColor = AppColors.primary,
  textColor = AppColors.white,
  icon,
  iconPosition = 'right',
  showIcon = true,
  fullWidth = true,
  disabled = false,
  className = '',
  style = {},
  variant = 'default',
  ...props 
}) => {
  const paddingVariants = {
    default: 'py-4 px-6',
    addUser: 'py-2.5 px-4',
    filter: 'py-2.5 px-5'
  };

  const selectedPadding = paddingVariants[variant] || paddingVariants.default;

  const buttonStyle = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: textColor,
    ...AppFonts.mdBold({ color: textColor }),
    ...style,
  };

  const baseClasses = `
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${selectedPadding}
    rounded-full
    border
    transition-all
    duration-200
    ease-in-out
    outline-none
    flex
    items-center
    justify-center
    gap-2
    focus:ring-2
    focus:ring-offset-2
    ${disabled 
      ? 'cursor-not-allowed opacity-50' 
      : 'cursor-pointer hover:opacity-90'
    }
    ${variant === 'addUser' ? 'whitespace-nowrap' : ''}
    ${className}
  `;

  const renderIcon = (iconElement) => {
    if (!iconElement) return null;
    
    if (typeof iconElement === 'string') {
      return (
        <img 
          src={iconElement} 
          alt="icon" 
          className={`w-5 h-5 ${
            textColor === AppColors.white 
              ? 'brightness-0 invert' 
              : textColor === AppColors.primary 
                ? 'brightness-0 saturate-100 invert-77 sepia-85 saturate-255 hue-rotate-166 brightness-99 contrast-96'
                : ''
          }`}
        />
      );
    } else {
      return React.cloneElement(iconElement, { 
        className: 'w-5 h-5',
        style: { color: textColor, ...iconElement.props?.style }
      });
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={{
        ...buttonStyle,
        focusRingColor: AppColors.info_500,
      }}
      {...props}
    >
      {showIcon && icon && iconPosition === 'left' && (
        <span className="flex items-center">
          {renderIcon(icon)}
        </span>
      )}
      
      <span style={{ color: textColor }}>{children}</span>
      
      {showIcon && icon && iconPosition === 'right' && (
        <span className="flex items-center">
          {renderIcon(icon)}
        </span>
      )}
    </button>
  );
};

export default Button;