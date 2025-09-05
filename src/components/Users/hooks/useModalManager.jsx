// src/components/Users/hooks/useModalManager.jsx
import { useState } from 'react';

export const useModalManager = (initialState = false) => {
  const [isMainModalOpen, setIsMainModalOpen] = useState(initialState);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openMainModal = () => setIsMainModalOpen(true);
  const closeMainModal = () => setIsMainModalOpen(false);

  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleConfirm = (onConfirmCallback) => {
    if (onConfirmCallback) onConfirmCallback();
    closeConfirmationModal();
    closeMainModal();
  };

  const handleCancelConfirmation = () => {
    closeConfirmationModal();
  };

  return {
    isMainModalOpen,
    isConfirmationModalOpen,
    openMainModal,
    closeMainModal,
    openConfirmationModal,
    closeConfirmationModal,
    handleConfirm,
    handleCancelConfirmation
  };
};