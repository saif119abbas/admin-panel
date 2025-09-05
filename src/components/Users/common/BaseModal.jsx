// src/components/common/BaseModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '500px',
  height = 'auto',
  maxWidth = '90vw',
  maxHeight = '90vh',
  showCloseButton = true,
  overlayClickClose = true,
  zIndex = 50,
  customHeader
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayClickClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex }}
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{ 
          width, 
          height, 
          maxWidth, 
          maxHeight 
        }}
      >
        {/* Header */}
        {(title || customHeader) && (
          <div className="flex items-center justify-between px-6 border-b border-gray-200 min-h-[80px]">
            {customHeader || <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="bg-[#000034] px-6 py-4 flex items-center justify-end space-x-3 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;