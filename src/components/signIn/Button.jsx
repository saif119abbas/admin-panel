import React from 'react';

const Button = ({ 
  children,
  onClick,
  type = 'button',
  backgroundColor = '#05CBE7',
  borderColor = '#05CBE7',
  textColor = 'white',
  icon,
  iconPosition = 'right',
  showIcon = true,
  fullWidth = true,
  disabled = false,
  className = '',
  ...props 
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: textColor,
    paddingTop: '15px',
    paddingBottom: '15px',
    borderRadius: '48px',
    border: `2px solid ${borderColor}`,
  };

  const widthClass = fullWidth ? 'w-full' : 'w-auto px-6';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${widthClass} flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={buttonStyle}
      {...props}
    >
      {showIcon && icon && iconPosition === 'left' && (
        <span className="flex items-center">
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {showIcon && icon && iconPosition === 'right' && (
        <span className="flex items-center">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;

