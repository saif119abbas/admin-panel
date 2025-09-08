import BaseModal from './Users/common/BaseModal.jsx';
import Button from './signIn/Button.jsx';
import AppColors from '../utils/AppColors.js';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false
}) => {
  const footer = (
    <div className="flex items-center justify-end space-x-3 w-full">
      <Button
        onClick={onClose}
        backgroundColor={AppColors.white}
        borderColor={AppColors.gray_300}
        textColor={AppColors.gray_700}
        showIcon={false}
        fullWidth={false}
        disabled={isLoading}
        className="px-4 py-2"
      >
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        backgroundColor={AppColors.danger}
        borderColor={AppColors.danger}
        textColor={AppColors.white}
        showIcon={false}
        fullWidth={false}
        disabled={isLoading}
        className="px-4 py-2"
      >
        {isLoading ? "Deleting..." : confirmText}
      </Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      width="400px"
      showCloseButton={true}
      overlayClickClose={!isLoading}
    >
      <div className="text-center py-4">
        <p className="text-gray-700">{message}</p>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;