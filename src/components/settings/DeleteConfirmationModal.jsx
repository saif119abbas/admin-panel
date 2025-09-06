import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from '../signIn/Button.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import { useUser } from '../../context/UserContext.jsx';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userId, isDeleting }) => {
  const { users } = useUser();
  
  console.log('DeleteConfirmationModal props:', { isOpen, userId, isDeleting });
  console.log('Users in context:', users);
  
  // Handle both object and string userId
  const userIdValue = typeof userId === 'object' ? userId?.id : userId;
  
  if (!isOpen || !userIdValue) {
    console.log('Modal not rendering - isOpen:', isOpen, 'userId:', userIdValue);
    return null;
  }

  // Find user by ID, handling both string and object IDs
  const user = users.find(u => u.id === userIdValue || u.id === userId?.id);
  console.log('Found user:', user);
  
  // Show a loading state if user is not found yet
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user information...</p>
          </div>
        </div>
      </div>
    );
  }

  const getUserFullName = () => {
    if (user.name) return user.name;
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.fullName) return user.fullName;
    return user.email || user.emailAddress || 'this user';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={!isDeleting ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close Button */}
        {!isDeleting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 
          className="text-lg font-bold text-center mb-2"
          style={AppFonts.lgBold({ color: AppColors.black })}
        >
          Delete User
        </h2>

        {/* Message */}
        <p 
          className="text-center text-gray-600 mb-6"
          style={AppFonts.smRegular({ color: AppColors.gray })}
        >
          Are you sure you want to delete "{getUserFullName()}"?
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            backgroundColor={AppColors.gray_500}
            borderColor={AppColors.gray_500}
            textColor={AppColors.white}
            showIcon={false}
            fullWidth={true}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            onClick={onConfirm}
            backgroundColor={AppColors.danger}
            textColor={AppColors.white}
            showIcon={false}
            fullWidth={true}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
