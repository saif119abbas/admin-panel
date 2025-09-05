// src/components/Users/common/ActionButton.jsx
import { ChevronDown } from 'lucide-react';

const ActionButton = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  iconPosition = 'left',
  ...props
}) => {
  // Base button classes
  const baseClasses = 'font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variants = {
    primary: 'bg-[#05CBE7] text-white hover:bg-[#04b4d1] focus:ring-[#05CBE7] border-[#05CBE7]',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    outline: 'border border-[#05CBE7] text-[#05CBE7] bg-transparent hover:bg-[#05CBE7] hover:text-white focus:ring-[#05CBE7]',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 border-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 border-green-500',
    ghost: 'bg-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500'
  };

  // Size styles
  const sizes = {
    small: 'px-3 py-1.5 text-xs h-7 rounded-2xl',
    medium: 'px-4 py-2 text-sm h-9 rounded-2xl',
    large: 'px-6 py-3 text-base h-12 rounded-2xl',
    icon: 'p-2 h-9 w-9 rounded-2xl'
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';

  // Icon spacing
  const getIconSpacing = () => {
    if (size === 'small') return 'space-x-1';
    if (size === 'medium') return 'space-x-2';
    if (size === 'large') return 'space-x-3';
    return '';
  };

  // Icon size based on button size
  const getIconSize = () => {
    if (size === 'small') return 'w-3 h-3';
    if (size === 'medium') return 'w-4 h-4';
    if (size === 'large') return 'w-5 h-5';
    return 'w-4 h-4';
  };

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClasses}
    ${getIconSpacing()}
    ${className}
  `.trim();

  const iconClasses = getIconSize();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={iconClasses} />}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && <Icon className={iconClasses} />}
    </button>
  );
};

export default ActionButton;