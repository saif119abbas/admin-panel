// src/components/CustomerSupport/modals/StatusChangeConfirmationModal.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import ActionButton from '../../Users/common/ActionButton'; 
import BaseModal from '../../Users/common/BaseModal'; 

const StatusChangeConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  newStatus,
  zIndex = 60
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  const customHeader = (
    <div className="flex items-center gap-2">
      <AlertCircle className="w-5 h-5 text-orange-500" />
      <h2 className="text-lg font-semibold text-gray-900">Alert!</h2>
    </div>
  );

  const footer = (
    <>
      <ActionButton
        type="button"
        variant="secondary"
        onClick={handleCancel}
        className="!bg-transparent !text-gray-300 !border-gray-500 hover:!bg-gray-700 hover:!text-white min-w-[80px] h-9"
      >
        Cancel
      </ActionButton>
      <ActionButton
        type="button"
        variant="primary"
        onClick={handleConfirm}
        className="min-w-[60px] h-9"
      >
        Yes
      </ActionButton>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      customHeader={customHeader}
      footer={footer}
      width="500px"
      zIndex={zIndex}
    >
      <p className="text-gray-700 text-sm">
        Are you sure you want to change status{newStatus ? ` to ${newStatus}` : ''}?
      </p>
    </BaseModal>
  );
};

export default StatusChangeConfirmationModal;